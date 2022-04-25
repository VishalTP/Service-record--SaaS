const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Vendor = require("../models/vendorModel");

// Add a Vendor
exports.addVendor = catchAsyncErrors(async (req, res, next) => {

  const { name, contactPerson, contactNumber, email, location } = req.body;

  await Vendor.create({
    name,
    contactPerson,
    contactNumber,
    email,
    location
  });

  res.status(200).json({
    success: true,
    message: "Vendor Successfully Added",
  });
});


// Get Vendor Detail
exports.getVendorDetails = catchAsyncErrors(async (req, res, next) => {
  const vendor = await Vendor.findById(req.params.id);

  res.status(200).json({
    success: true,
    vendor,
  });
});



// Get all vendors(admin)
exports.getAllVendors = catchAsyncErrors(async (req, res, next) => {
  const vendors = await Vendor.find();

  res.status(200).json({
    success: true,
    vendors,
  });
});

exports.updateVendor = catchAsyncErrors(async (req, res, next) => {
  let vendor = await Vendor.findById(req.params.id);

  vendor = await Vendor.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    message: "Vendor Updated Successfully",
  });
});

// Delete User --Admin
exports.deleteVendor = catchAsyncErrors(async (req, res, next) => {
  const vendor = await Vendor.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHander(`Vendor does not exist with Id: ${req.params.id}`, 400)
    );
  }

  await user.remove();

  res.status(200).json({
    success: true,
    message: "Vendor Deleted Successfully",
  });
});
