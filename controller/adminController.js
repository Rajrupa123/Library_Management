const Admin=require("../models/adminSchema");
const db=require("../config/mongoose")

module.exports.signup=function(req,res) {
    res.render("signup")
}
module.exports.login=function(req,res) {
    res.render("login")
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


module.exports.create=function(req,res) {  //npm i mongoose@4.7.3 use this old version to use callback function
    if(req.body.password != req.body.confirm_password){
        return res.redirect("back");

    }
    Admin.findOne({email:req.body.email},function(err,admin) {
        if(err){console.log("Error in finding the user");return}
        if(!admin){
            Admin.create(req.body,function(err,admin) {
                if(err){console.log("Error in creating the user");return}
                return res.redirect("/admin/login");
            })
        }
        else{
            return res.redirect("back");
        }
    })

}

/*
module.exports.createSession=function(req,res) {
    Admin.findOne({email:req.body.email},function(err,admin) {
        if(err){console.log("Error in finding the user while signing in");return}
        if(admin){
            if(admin.email!=req.body.email){
                return res.redirect("back")
            }
            res.cookie("user_id",admin.id);
            return res.redirect("/admin/admin_details");
        }
        else{
            return res.redirect("back")
        }
    })
}*/

module.exports.createSession=function(req,res) {
    
    return res.redirect("/admin/admin_details")
 }
 
 module.exports.destroySession=function(req,res,next) {
     req.logout(function(err) {
         if (err) {
           return next(err);
         }
         res.redirect("/");
       });
 }
 
