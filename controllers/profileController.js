const bcrypt = require("bcrypt");
const userModel = require('../models/userModel');
const tempuserhehe = require('../models/tempuserhehe');

//user login
async function login(req, res) {
    try {
        const { password, username } = req.body;

        // Retrieve the user from the database
        const user = await userModel.getuserUsername(username);

        if (!user) {
            // If the user does not exist
            return res.render('login', { 
                title: 'Login', 
                layout: 'loginLayout', 
                error: 'Invalid username or password' 
            });
        }

        // Ensure the hashed password is treated as a string
        const hashedPassword = user.password.toString();

        // Compare the provided password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, hashedPassword);

        if (isMatch) {
            // If the password matches, set the current user and redirect to the home page
            tempuserhehe.setcurrentUser(user);
            return res.redirect('/');
        } else {
            // If the password does not match
            return res.render('login', { 
                title: 'Login', 
                layout: 'loginLayout', 
                error: 'Invalid username or password' 
            });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).render('login', { 
            title: 'Login', 
            layout: 'loginLayout', 
            error: 'Server error. Please try again later.' 
        });
    }
}

// async function login(req, res) {
//     try {
//         const { password, username } = req.body;

//         console.log('Login attempt:', { username, password });

//         // Retrieve the user from the database
//         const user = await userModel.getuserUsername(username);
//         if (!user) {
//             console.log('User not found');
//             return res.render('login', { 
//                 title: 'Login', 
//                 layout: 'loginLayout', 
//                 error: 'Invalid username or password' 
//             });
//         }

//         console.log('Stored password:', user.password);
//         console.log('Password to hash:', password);
//         // Check if the password matches
//         const isMatch = await bcrypt.compare(password, user.password);
//         console.log('Password match:', isMatch);

//         if (isMatch) {
//             tempuserhehe.setcurrentUser(user);
//             return res.redirect('/');
//         } else {
//             return res.render('login', { 
//                 title: 'Login', 
//                 layout: 'loginLayout', 
//                 error: 'Invalid username or password' 
//             });
//         }
//     } catch (error) {
//         console.error('Login error:', error);
//         res.status(500).render('login', { 
//             title: 'Login', 
//             layout: 'loginLayout', 
//             error: 'Server error. Please try again later.' 
//         });
//     }
// }

//user reegistration
async function register(req, res) {
    try {
        const { email, password, username} = req.body;
        // Validate input
        if (!email || !password || !username) {
            return res.render('register', { 
                title: 'Register', 
                layout: 'loginLayout', 
                error: 'All fields are required.' 
            });
        }
       //checker if username exist
        const existingUser = await userModel.getuserUsername(username);
        
        if (existingUser) {
            return res.render('register', { 
                title: 'Register', 
                layout: 'loginLayout', 
                error: 'This username is already used, please use another one.' 
            });
        }
    
        const hashedPassword = await bcrypt.hash(String(password), 10);
        console.log('Hashed Password:', hashedPassword);
        const newUser = await userModel.createUser({ username, password:hashedPassword, email });
        // console.log('Plain Password:', password);
        // console.log('Hashed Password from DB:', user.password);
        // console.log('Password Match:', await bcrypt.compare(password, user.password.toString()));
        
        // Set the current user after registration
        tempuserhehe.setcurrentUser({
            username,
            email, 
            password:hashedPassword,
            _id: newUser.insertedId,
            joinDate: new Date(),
            posts: 0,
            comments: 0
        });
        
        //redirect to home page instead of login
        return res.redirect('/'); 
    } catch (error) {
        console.error('registration error:', error);
        res.status(500).render('register', { 
             title: 'Register', 
            layout: 'loginLayout', 
            error: 'server error. Please try again later.' 
        });
    }
}

// logout
function logout(req, res) {
    tempuserhehe.setcurrentUser(null);
    res.render('logout', { title: 'Logout' });
}

module.exports = {
    login,
    register,
    logout
};