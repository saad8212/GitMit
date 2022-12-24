const express = require("express");
const router = express.Router();
var jwt = require('jsonwebtoken');
const jwtkey = "directory_token"; 
const {  register, login } = require("../controllers/UserController");
const {
  add_record,
  get_record,
  update_record,
  remove_record,
  edit_record
} = require("../controllers/PhonebookController");

//middleware
let verifyToken = (req, res, next) => {
    let token = req.headers["authorization"];
    if (token) {
      token = token.split(" ")[1];
      console.log(token);
    jwt.verify(token,jwtkey,(err,response) =>{
        if(err) {
            res.status(401).send({ message: "Token is Invalid" });
        } else {
            next();
        }
    })
  } else {
    res.status(403).send({ message: "Token is required" });
  }
};



//user routes
router.post("/register", register);
router.post("/login", login);

 

//phonebook routes

router.get("/phonebook",verifyToken, get_record);
router.post("/phonebook",verifyToken, add_record); 
router.get("/phonebook/:id",verifyToken, edit_record);
router.put("/phonebook/:id",verifyToken, update_record);
router.delete("/phonebook/:id",verifyToken, remove_record);
module.exports = router;
