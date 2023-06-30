const mongoose=require("mongoose");
const adminSchema=new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unqiue:false
        
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const Admin=mongoose.model("Admin",adminSchema);
module.exports=Admin;