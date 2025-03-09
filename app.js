
const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const server = express();
const path = require('path');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

//Middleware to check if user is authenticated
// function isAuthenticated(req, res, next) {
//     const isLoggedIn = req.session && req.session.user;
//     if (isLoggedIn) {
//         return next();
//     }
//     else{
//         res.redirect('/login');
//     }
// }

server.engine('hbs', exphbs.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials')
}));
server.set('view engine', 'hbs');
server.set('views', path.join(__dirname, 'views'));

server.use(express.static(path.join(__dirname, 'public')));

//MongoDB connection
//Please check na lang if tama
const { MongoClient } = require('mongodb');
const { error } = require('console');
const dURL = "mongodb://127.0.0.1:27017/";
const mongoClient = new MongoClient(dURL);

const databaseName = "forumdb";
const userdb = "users";
const postdb = "posts";
const commentsdb = "comments";


async function initialConntection(){
    await mongoClient.connect();
    console.log('Attempt to connect to ' +dURL);
    const dbo = mongoClient.db(databaseName);
 
    dbo.createCollection(userdb);       //database for users
    dbo.createCollection(postdb);       //database for posts
    dbo.createCollection(commentsdb);   //database for comments
}
initialConntection();

//until here

server.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));
server.use(flash());
server.use(bodyParser.urlencoded({extended:true}));

server.use(express.json()); // Middleware to parse JSON requests
server.use(express.urlencoded({ extended: true })); // Middleware to parse form data

//User Registration
server.post('/register', async (req, resp) => { 
    const {username, password} = req.body;
    
    try {
        const dbo = mongoClient.db(databaseName);
        const col = dbo.collection(userdb);
        
        // Checker if username exists
        const existingUser = await col.findOne({username});
        if (existingUser) {
            req.flash('errorMessage', 'Username already exists.');
            console.error('Username already exists.');
            return resp.redirect('/register');
        }
        await col.insertOne({username, password});
        req.flash('successMessage', 'User registered.');
        console.log('Success');
        resp.redirect('/login');
    } catch(error) {
        console.error('Error in registering user.🥲', error);
        req.flash('errorMessage', 'Error in registering user.🥲');
        resp.redirect('/register');
    }
  });

  // User Login
  server.post('/login', async (req, resp) => { 
    const {username, password} = req.body;
    
    try {
        const dbo = mongoClient.db(databaseName);
        const col = dbo.collection(userdb);
        
        // Checker if user exists
        const user = await col.findOne({username});
        if (user) {
            req.session.user; {username};
            resp.redirect('/');
        }
        else {
            req.flash('errorMessage', 'User does not exist.');
            console.error('User does not exist.', error);
            resp.redirect('/register');
        }
        // await col.insertOne({username, password});
        // console.log('Success');
        // resp.redirect('/');
    } catch(error) {
        console.error('Please try again later', error);
        req.flash('errorMessage', 'Please try again later');
        resp.redirect('/login');
    }
  });

//server.get('/', isAuthenticated, (req, res) => res.render('index', { title: 'Forum Home' })); Change line 30 to this line if middleware is used
server.get('/', (req, res) => res.render('index', { title: 'Forum Home'}));
server.get('/login', (req, res) => res.render('login', { title: 'Login', layout: 'loginLayout' }));
server.get('/register', (req, res) => res.render('register', { title: 'Register', layout: 'loginLayout' }));
server.get('/logout', (req, res) => res.render('logout', { title: 'Logout' }));

// server.post('/login', (req, res) => {
//     const { username, password } = req.body;

//     if (username === 'testuser' && password === 'password') {
//         req.session.user = { username };
//         res.redirect('/');
//     } else {
//         res.render('login', { title: 'Login', layout: 'loginLayout', error: 'Invalid username or password' });
//     }
// });

//For mongoDB to destroy session
// server.get('/logout', (req, res) =>{
//     req.session.destroy();
//     res.render('logout',{title:"Logout"});
//     res.redirect('/login');
// });

server.listen(3000, () => console.log("Server running on port 3000"));


