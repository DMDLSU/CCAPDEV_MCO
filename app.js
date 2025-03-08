
const express = require('express');
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
const dURL = "mongodb://127.0.0.1:27017/";
const mongoClient = new MongoClient(dURL);

const databaseName = "forumdb";
const userdb = "users";
const postdb = "posts";
const commentsdb = "comments";


async function initialConntection(){
    let con = await mongoClient.connect();
    console.log('Attempt to connect to ' +dURL);
    const dbo = mongoClient.db(databaseName);
 
    dbo.createCollection(userdb);       //database for users
    dbo.createCollection(postdb);       //database for posts
    dbo.createCollection(commentsdb);   //database for comments
}
initialConntection();

//until here


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
