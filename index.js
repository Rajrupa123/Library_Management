const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')(session);
const db = require("./config/mongoose"); // Import the db variable
require('dotenv').config();


const port = process.env.PORT ||8000;
const mongodbURI = process.env.MONGODB_URI;
const secretKey = process.env.SECRET_KEY;

app.use(express.urlencoded());

app.use(cookieParser());
app.use(express.static("public"));
app.use(express.static('./assets'));

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name: 'codeial',
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore({
        mongooseConnection: db, // Use the db variable here
        autoRemove: 'disabled'
    }),
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use('/', require('./routes'));

app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});