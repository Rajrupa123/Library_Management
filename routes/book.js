const express = require('express');
const router = express.Router();
const bookController = require('../controller/bookController');

// Define your book routes
router.get('/add_book', bookController.add_book);
router.get('/book_record', bookController.record);
router.get('/book_details', bookController.details_book);
router.get('/book_details/:book_id', bookController.details_book);
router.get('/delete_book', bookController.delete_book);
router.get('/search', bookController.search);
router.post('/create', bookController.create);

module.exports = router;
