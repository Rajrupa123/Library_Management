const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost/library_db");
const db=mongoose.connection;
db.on("error",console.error.bind(console,"Error while connecting to mongoose"));
db.once("open",function(params) {
    console.log("Successfully connected to db");
})
module.exports=db;
