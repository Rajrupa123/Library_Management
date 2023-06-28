const Admin=require("../models/adminSchema");
const db=require("../config/mongoose")
const passport = require("passport");


module.exports.signup=function(req,res) {
    if (req.isAuthenticated()){
        return res.redirect('/admin/admin_details');
    }


    return res.render('signup')
}
module.exports.login=function(req,res) {
    if (req.isAuthenticated()){
        return res.redirect('/admin/admin_details');
    }
    return res.render('login')
}
module.exports.admin_details=function name(req,res) {
 Admin.find({},function(err,admin) {
     if(err){
         console.log("Error while finding the admin")
     } 
     return res.render("admin_details",{
         admin:admin
     })
 })
}


module.exports.create=function(req,res) { 
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    Admin.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing up'); return}

        if (!user){
            Admin.create(req.body, function(err, user){
                if(err){console.log('error in creating user while signing up'); return}

                return res.redirect('/admin/login');
            })
        }else{
            return res.redirect('back');
        }

    });

}

  



module.exports.createSession = function (req, res, next) {
    return res.redirect('/admin/admin_details');
  };
  
 

  module.exports.destroySession = function(req, res){
    req.logout();
    
    res.redirect('/');
  
}

  