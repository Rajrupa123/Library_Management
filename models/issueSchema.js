const mongoose=require("mongoose");
const issueSchema=new mongoose.Schema({

    book_name:{
      type:String,
      required:true
    },
   student_name:{
    type:String,
    required:true
   },
   doi:{
    type:String,
    required:true
   },
   dor:{
    type:String,
    required:true

   }

})

const Issue=mongoose.model("Issue",issueSchema);
module.exports=Issue;