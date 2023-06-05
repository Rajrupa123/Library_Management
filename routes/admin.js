const express=require("express");
const router=express.Router();
const passport = require("passport");
const adminController=require("../controller/adminController");

router.get("/signup",adminController.signup);
router.get("/login",adminController.login);
router.get("/admin_details",passport.checkAuthentication,adminController.admin_details);

router.post("/create",adminController.create)
router.post("/create-session",passport.authenticate(
    "local",
    { failureRedirect: '/admin/login' },
    ),adminController.createSession);
    
router.get('/sign-out', adminController.destroySession);
router.get('/admin', (req, res) => {
    const admin = { name: 'John Doe' }; // replace with your actual admin object
    res.render('admin', { admin });
  });


module.exports=router;