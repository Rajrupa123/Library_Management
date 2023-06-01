const Book = require("../models/bookSchema");

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
};



module.exports.details_book = function(req, res) {
  return res.render("book_details");
};

module.exports.create = function(req, res) {
  console.log(req.body);
  Book.create(req.body, function(err, newBook) {
    if (err) {
      console.log(err);
      console.log("Error while creating book:");
      return;
    }
    console.log("New Book:", newBook);
    return res.redirect("/book/book_record");
  });
};

module.exports.delete_contact = function(req, res) {
  let id = req.query.id;
  Book.findByIdAndDelete(id, function(err) {
    if (err) {
      console.log("Error while deleting the contact");
    }
    return res.redirect("back");
  });
};
