const express = require('express');
// index.js

const cookieParser = require('cookie-parser');
const app = express();
//const port=8000;

const db = require('./config/mongoose');
// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')(session);
const connectDB=require("./config/mongoose")

const port = process.env.PORT || 8000;
const mongodbURI = process.env.MONGODB_URI;
const secretKey = process.env.SECRET_KEY;
// index.js

const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

// index.js


const { connectToDatabase } = require("./config/db");

// Call the function to connect to MongoDB
connectToDatabase();

// ... Rest of your code ...





app.use(express.urlencoded());

app.use(cookieParser());
app.use(express.static("public"));

app.use(express.static('./assets'));






// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    
    store: new MongoStore(
        
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        
        },
        
        function(err){
            console.log(err ||  'connect-mongodb setup ok');
        }
    )


    

}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// use express router
app.use('/', require('./routes'));


app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
