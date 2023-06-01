const express=require("express");
const router=express.Router();
const issueController=require("../controller/issueController");
const passport=require("passport");
router.get("/issue_book",passport.checkAuthentication,issueController.issue_book);
router.get("/issue_book_record",passport.checkAuthentication,issueController.issue_book_record);

router.post("/create",issueController.create);


module.exports=router;