const mongoose = require("mongoose");
const validator = require("validator");

const serviceSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Name"],
    trim: true,
  },
  contactNumber: {
    type: Number,
    required: [true, "Please Enter Contact Number"],
    maxLength: [10, "Number cannot exceed 10 characters"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Email Id"],
    validate: [validator.isEmail, "Please Enter a valid Email"],
  },
  serviceCode: {
    type: Number,
    required: [true, "Please Enter Service Code"],
  },
  status: {
    type: String,
    default: "open",
  },
  productType: {
    type: String,
    required: [true, "Please Enter Product Type"],
  },
  serialNumber: {
    type: String,
    required: [true, "Please Enter Serial Number"],
  },
  location: {
    type: String,
    required: [true, "Please Enter the Location"],
  },
  assignedTo: {
    type: String,
    required: [true, "Please Select the Assigned User"],
  },
  vendor: {
    type: String,
    required: [true, "Please Select the Vendor"],
  },
  issue: {
    type: String,
    required: true,
  },
  deviceDetails: {
    type: String,
    required: true,
  },
  serviceDetails: {
    type: String,
    default: "",
  },
  pendingAmount: {
    type: Number,
    default: 0,
  },
  paidAmount: {
    type: Number,
    default: 0,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Service", serviceSchema);
