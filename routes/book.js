const express = require('express');
const router = express.Router();
const passport=require("passport");
const bookController=require("../controller/bookController")

router.get('/add_book',passport.checkAuthentication, bookController.add_book);
router.get('/book_record', bookController.record);
router.get('/book_details', bookController.details_book);
router.get('/book_details/:book_id', passport.checkAuthentication, bookController.details_book);
router.get("/delete_book",passport.checkAuthentication,bookController.delete_book);
router.get("/search",bookController.search);


router.post("/create",bookController.create);


module.exports = router;
