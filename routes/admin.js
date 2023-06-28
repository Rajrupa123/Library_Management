
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


router.get("/sign-out", function(req, res, next) {
    req.logout(function(err) {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  });

module.exports = router;