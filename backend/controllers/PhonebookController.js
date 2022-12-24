const Directory = require("../models/phonebook");


 
// Create a new record
const add_record = (req, res) => {
  const { fname, lname, address, email, phone } = req.body;
    //console.log(fname, lname, address, email, phone);
  if (fname && lname && address && email && phone) {
    const record = new Directory(req.body);
    let result = record.save();
    result.then((resp) => {
      console.log(resp);
      res.send(resp);
    });
  } else {
    res.status(400).send({ message: "All fields are compulsory" });
  }
};

// get all records

const get_record = async (req, res) => {
    const records =await Directory.find();
    if(records) {
      console.log(records);
      res.status(200).send(records);
    }
    else {
      res.status(404).send({message:"not found"});
    }
  };
  
   

  //edit an existing activity
  const edit_record = async(req, res) => {
    const id = req.params.id; 
    console.log(id);
    const record =await Directory.findById(id);
    if (record){
      console.log(record);
      res.send(record);
    } else {
      res.status(404).send({message:"not found"})
    }
  };
  
  //update activity
  const update_record = (req, res) => {
    const id = req.params.id;
    console.log(id);
    console.log(req.body);
    const product = Directory.findByIdAndUpdate(id, { $set: req.body });
    product.then((resp) => {
    let result = Directory.findById(resp.id);
    result.then((response) => {
      if(response) {
        console.log(response);
        res.status(200).send(response);
      } else {
        res.status(404).send({message: 'Product not found'});
      }
    });
  });
  };
  
  //Remove a Product
  const remove_record = (req, res) => {
    const id = req.params.id;
    console.log(id);
    const record = Directory.findByIdAndRemove(id);
    record.then((resp) => {
      console.log(resp);
      res.send({ message: "Phonebook deleted successfully!" });
    });
  };
  




module.exports = {add_record, remove_record, edit_record, update_record,get_record};
