const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter the Device Name"],
  },
  serialNo: {
    type: String,
    required: [true, "Please Enter Serial Number"],
  },
  warranty: {
    type: Number,
    required: [true, "Please Enter the Warranty Period"],
  },
  vendor: {
    type: String,
    required: [true, "Please Select the Vendor"],
  },
  amount: {
    type: Number,
    required: [true, "Please Enter the Amount"],
  },
  service: {
    type: mongoose.Schema.ObjectId,
    ref: "Service",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});


module.exports = mongoose.model("Device", deviceSchema);
