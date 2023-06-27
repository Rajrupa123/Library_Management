const Book = require("../models/bookSchema");

let bookCounter = 0;

function getMaxBookId(callback) {
  Book.findOne({}, null, { sort: { book_id: -1 } }, function(err, book) {
    if (err) {
      console.log("Error while finding max book ID:", err);
      return callback(err);
    }

    if (book) {
      const lastBookId = book.book_id;
      const lastBookCounter = Number(lastBookId.substring(2));
      bookCounter = lastBookCounter;
    }

    callback(null);
  });
}

module.exports.add_book = function(req, res) {
  return res.render("add_book");
};

module.exports.record = function(req, res) {
  Book.find({}, function(err, books) {
    if (err) {
      console.log("Error while finding books:", err);
      return res.status(500).send("Internal Server Error");
    }
    return res.render("book_record", {
      books: books,
      query: ""
    });
  });
};

/*
module.exports.search = function(req, res) {
  const query = req.query.q; // Get the search query from the URL query string

  Book.find({ book_name: { $regex: query, $options: 'i' } }, function(err, books) {
    if (err) {
      console.log("Error while searching books:", err);
      return res.status(500).send("Internal Server Error");
    }

    return res.render("search", {
      query: query,
      books: books
    });
  });
};*/

module.exports.search = function(req, res) {
  const query = req.query.q; // Get the search query from the URL query string
  const regex = new RegExp(query, 'i'); // Create a case-insensitive regular expression

  Book.find({ 
    $or: [
      { book_name: { $regex: regex } }, // Match book name
      { book_author: { $regex: regex } }, // Match book author
      { book_publisher: { $regex: regex } } // Match book publisher
    ]
  }, function(err, books) {
    if (err) {
      console.log("Error while searching books:", err);
      return res.status(500).send("Internal Server Error");
    }

    return res.render("search", {
      query: query,
      books: books
    });
  });
};



module.exports.details_book = function(req, res) {
  const bookId = req.params.book_id; // Get the bookId from the URL parameter

  Book.findOne({ book_id: bookId }, function(err, book) {
    if (err) {
      console.log("Error while finding book:", err);
      return res.status(500).send("Internal Server Error");
    }

    if (!book) {
      console.log("Book not found");
      return res.status(404).send("Book not found");
    }

    return res.render("book_details", { book: book });
  });
};

const multer = require('multer');

// Configure multer for handling file uploads
const upload = multer({ dest: 'public/images/' });

// ...

module.exports.create = function(req, res, next) {
  upload.single('book_image')(req, res, function(err) {
    if (err) {
      console.log("Error uploading file:", err);
      return res.status(500).send("Internal Server Error");
    }

    console.log(req.body);
    console.log(req.file);

    getMaxBookId(function(err) {
      if (err) {
        console.log("Error while getting max book ID:", err);
        return res.status(500).send("Internal Server Error");
      }

      // Increment the book counter
      bookCounter++;

      // Generate the book ID in the format BHXXX (e.g., BH001, BH002)
      const bookId = `BH${bookCounter.toString().padStart(3, '0')}`;

      // Add the generated book ID and image path to the request body
      req.body.book_id = bookId;
      req.body.book_image = req.file.filename;

      Book.create(req.body, function(err, newBook) {
        if (err) {
          console.log(err);
          console.log("Error while creating book:");
          return;
        }
        console.log("New Book:", newBook);
        return res.redirect("/book/book_record");
      });
    });
  });
};



module.exports.delete_book = function(req, res) {
  let id = req.query.id;
  Book.findByIdAndDelete(id, function(err) {
    if (err) {
      console.log("Error while deleting the contact");
      return res.status(500).send("Internal Server Error");
    }

    // Reset the bookCounter to 0 when all books are deleted
    bookCounter = 0;

    return res.redirect("back");
  });
};