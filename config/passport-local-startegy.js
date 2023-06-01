const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const Admin = require("../models/adminSchema");

passport.use(new LocalStrategy({
    usernameField: "email"
},
    function (email, password, done) {
        Admin.findOne({ email: email }, function (err, admin) {
            if (err) {
                console.log("Errror in finding the user --->passport");
                return done(err)
            }

            if (!admin || admin.password != password) {
                console.log("Invalid username/password");
                return done(null, false);
            }
            return done(null, admin);
        })
    }

));

passport.serializeUser(function name(admin,done) {
    done(null,admin.id);
});

passport.deserializeUser(function(id,done) {
    Admin.findById(id,function(err,admin) {
        if(err){
           console.log("Errro while finding user");
           return done(err);
        }
        return done(null,admin)
    })
})


passport.checkAuthentication=function(req,res,next) {
    if(req.isAuthenticated()){
        return next()
    }

    return res.redirect("/admin/login")
}

passport.setAuthenticatedUser=function(req,res,next) {
    if(req.isAuthenticated()){
        res.locals.user=req.admin
    }
    next();
}

module.exports=passport;