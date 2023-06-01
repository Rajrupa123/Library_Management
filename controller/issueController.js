const Issue = require("../models/issueSchema");

module.exports.issue_book = function (req, res) {
    return res.render("issue_book");
}

module.exports.issue_book_record = function (req, res) {
    Issue.find({}, function (err, issue_book) {
        if (err) {
            console.log("Error while finding new book")
        }
        res.render("issue_book_record", {
            issue_book: issue_book
        })
    })
}

module.exports.create = function (req, res) {
    Issue.create(req.body, function (err, newIssue) {
        console.log(req.body);
        if (err) {
            console.log(err);
            console.log("Error while creating issue for the book")
        }
        return res.redirect("back");
    })
}

