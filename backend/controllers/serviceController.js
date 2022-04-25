const Service = require("../models/serviceModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const client = require('twilio')('AC51dff96a6e0ff6bc5352a7823e498e7a', 'cec51827505e0834662fe3c71c61464f');
// const client = twilio;


// Create Service -- Admin
exports.createService = catchAsyncErrors(async (req, res, next) => {

  req.body.user = req.user.id;

  const service = await Service.create(req.body);

  res.status(201).json({
    success: true,
    service,
  });
});


// Get All Services (Admin)
exports.getAllService = catchAsyncErrors(async (req, res, next) => {
  // const services = await Service.find();
  const resultPerPage = 8;
  const serviceCount = await Service.countDocuments()

  const apiFeature = new ApiFeatures(Service.find(), req.query)
    .search()
    .filter();

    let services = await apiFeature.query;

    let filteredServicesCount = services.length;
  
    apiFeature.pagination(resultPerPage);
  
    services = await apiFeature.query;

  res.status(200).json({
    success: true,
    services,
    serviceCount,
    resultPerPage,
    filteredServicesCount
  });
});

// Get Product Details
exports.getServiceDetails = catchAsyncErrors(async (req, res, next) => {
  const service = await Service.findById(req.params.id);

  if (!service) {
    return next(new ErrorHander("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    service,
  });
});

// Update Product -- Admin

exports.updateService = catchAsyncErrors(async (req, res, next) => {
  let service = await Service.findById(req.params.id);

  if (!service) {
    return next(new ErrorHander("Service not found", 404));
  }

  service = await Service.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    service,
  });
});

// Delete Service

exports.deleteService = catchAsyncErrors(async (req, res, next) => {
  const service = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  await product.remove();

  res.status(200).json({
    success: true,
    message: "Product Delete Successfully",
  });
});


exports.serviceReport = catchAsyncErrors(async (req, res, next) => {
  const services = await Service.find();
  
  let paidAmount = 0;
  let pendingAmount = 0;
  
  services.forEach(service=>{
    paidAmount += service.paidAmount
    pendingAmount += service.pendingAmount
  })


  res.status(200).json({
    success: true,
    paidAmount,
    pendingAmount,
    totalServices: services.length
  });
});


exports.sendWhatsAppMsg = catchAsyncErrors(async (req, res, next) => {
  const { message, contactNumber} = req.body;
  console.log(message, contactNumber)
  
  client.messages.create({
    from: 'whatsapp:+14155238886',
    body: `${message}`,
    to: `whatsapp:+917293840520`
  }).then(message => console.log(message.sid)).catch(err=>console.log(err));

  res.status(200).json({
    success: true,
    message: "Product Delete Successfully",
  });
})
