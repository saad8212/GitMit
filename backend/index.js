const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose.connect(`mongodb://localhost:27017/gitmit`).then(res =>{
    console.log("database connection established");
}).catch(err=>{
    console.log("error connecting to database, ", err);
})
app.use(cors());
app.use(express.json())
app.use('/', require("./routes/routes"));
app.listen("3005");

 

 
 
 
 