const mongoose = require("mongoose");


const bookSchema = new mongoose.Schema({
  book_id: {
    type: String,
    required: true,
    unique: true
  },
  book_name: {
    type: String,
    required: true,
  },
  book_author: {
    type: String,
    required: true,
  },
  book_publisher: {
    type: String,
    required: true,
  },
  book_price: {
    type: String,
    required: true,
  },
  book_image: {
    type: String,
    required: true
  }
});

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;