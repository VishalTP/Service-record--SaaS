const Service = require("../models/serviceModel");
const Device = require("../models/deviceModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const client = require('twilio')('AC51dff96a6e0ff6bc5352a7823e498e7a', 'd5506b8d9b79169cc718ffcfae7c8a9b');
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

// Get Service Details
exports.getServiceDetails = catchAsyncErrors(async (req, res, next) => {
  const service = await Service.findById(req.params.id);
  let device

  if (!service)
    return next(new ErrorHander("Product not found", 404));
  else
    device = await Device.find({ service: req.params.id });


  res.status(200).json({
    success: true,
    service,
    device: device.length ? device : null
  });
});

exports.createDevice = catchAsyncErrors(async (req, res, next) => {

  const device = await Device.create(req.body);


  res.status(201).json({
    success: true,
    device,
  });
});

exports.deleteDevice = catchAsyncErrors(async (req, res, next) => {
  const device = await Device.findById(req.params.id);

  if (!device) {
    return next(new ErrorHander("Product not found", 404));
  }

  await device.remove();

  res.status(200).json({
    success: true,
    message: "Device Delete Successfully",
  });
});

exports.updateDevice = catchAsyncErrors(async (req, res, next) => {
  let device = await Device.findById(req.params.id);

  if (!device) {
    return next(new ErrorHander("Device not found", 404));
  }

  device = await Device.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    device,
  });
});

exports.getDeviceDetails = catchAsyncErrors(async (req, res, next) => {
  const device = await Device.findById(req.params.id);

  if (!device)
    return next(new ErrorHander("Product not found", 404));

  res.status(200).json({
    success: true,
    device: device
  });
});

// Update Service -- Admin

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

  services.forEach(service => {
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
  const { message, contactNumber } = req.body;
  console.log(message, contactNumber)

  client.messages.create({
    from: 'whatsapp:+12542795905',
    body: `${message}`,
    to: `whatsapp:+917293840520`
  }).then(message =>{
    res.status(200).json({
      success: true,
      message: message,
    });

  }).catch(err => console.log(err));

  
})
