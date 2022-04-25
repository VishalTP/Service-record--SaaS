const mongoose = require("mongoose");
const validator = require("validator");


const vendorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "Name should have more than 4 characters"],
  },
  contactPerson: {
    type: String,
    required: [true, "Please Enter Your Name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "Name should have more than 4 characters"],
  },
  contactNumber: {
    type: Number,
    required: [true, "Please Enter Contact Number"],
    maxLength: [10, "Number cannot exceed 10 characters"],
  },
  email: {
    type: String,
    required: [true, "Please Enter the Email Id"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid Email"],
  },
 
  location: {
    type: String,
    required: [true, "Please Enter the Location"]
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});


module.exports = mongoose.model("Vendor", vendorSchema);
