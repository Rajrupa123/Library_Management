const express = require('express');
const router = express.Router();
const bookController = require('../controller/bookController');
const passport=require("passport");

// Define your book routes
router.get('/add_book',bookController.add_book);
router.get('/book_record', passport.checkAuthentication,bookController.record);
router.get('/book_details', passport.checkAuthentication,bookController.details_book);
router.get('/book_details/:book_id', passport.checkAuthentication,bookController.details_book);
router.get('/delete_book', passport.checkAuthentication,bookController.delete_book);
router.get('/search', passport.checkAuthentication,bookController.search);
router.post('/create', passport.checkAuthentication,bookController.create);

module.exports = router;
