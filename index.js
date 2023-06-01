const express=require("express");
const port=8000;
const path=require("path");
const bodyParser=require("body-parser");
const cookieParser=require("cookie-parser");
const db=require("./config/mongoose");
const session=require("express-session");
const passport = require('passport');
const passportLocal = require('./config/passport-local-startegy');
const MongoStore = require('connect-mongo')(session);

//const bodyParser=require("body-parser");
const app=express();

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('assets'));
app.use(session({
    name:"Fake Product Identification",
    secret:"blahsomething",
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },

    store:new MongoStore(
        {
         mongooseConnection:db,
         autoRemove:"disabled"
        },
        
        function(err) {
            console.log(err ||  'connect-mongodb setup ok');
        }
        
    )

    
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//app.use(express.urlencoded);
app.use("/",require("./routes/index"));

app.listen(port,function(err) {
    if(err){
        console.log("Error while loading the server");
    }
    console.log("Successfully server is connected with port number",port);
})
