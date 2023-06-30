const mongoose=require("mongoose");
mongoose.connect("mongodb+srv://rajruparoy1:kWOn1dj418qRUVt3@cluster0.wrzjtix.mongodb.net/");
const db=mongoose.connection;
db.on("error",console.error.bind(console,"Error while connecting to mongoose"));
db.once("open",function(params) {
    console.log("Successfully connected to db");
})
module.exports=db;