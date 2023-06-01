const express = require('express');
const router = express.Router();
const passport=require("passport");
const bookController=require("../controller/bookController")

router.get('/add_book',passport.checkAuthentication, bookController.add_book);
router.get('/book_record',passport.checkAuthentication, bookController.record);
router.get('/book_details',passport.checkAuthentication, bookController.details_book);
router.get("/delete_contact/",passport.checkAuthentication,bookController.delete_contact);
router.get("/search",bookController.search);


router.post("/create",bookController.create);


module.exports = router;
