const express=require("express");
const router=express.Router();
const homeController=require("../controller/homeController");
const bookController=require("../controller/bookController");


router.get("/",homeController.home);
router.get("/delete_book",bookController.delete_book);
router.use("/admin",require("./admin"));
router.use("/book",require("./book"));
router.use("/issue",require("./issues"));

module.exports=router;