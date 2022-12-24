const mongoose = require("mongoose");
let phonebookSchema = new mongoose.Schema({
  fname: {
    type:String,
    required: true, 
  },
  lname: {
    type:String,
    required: true,
  },
  email:{
    type:String,
    required: true,
  } ,
  phone:{
    type:String,
    required: true,
  } ,
  address: {
    type:String,
    required: true,
  },
  userId: {
    type:String,
    required: true,
  },
});
const Directory = mongoose.model("Directory", phonebookSchema);
module.exports = Directory;
