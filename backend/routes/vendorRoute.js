const express = require("express");
const {
  addVendor,
  updateVendor,
  getAllVendors,
  getVendorDetails,
  deleteVendor,
} = require("../controllers/vendorController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/addvendor").post(isAuthenticatedUser, addVendor);

router.route("/vendordetails/:id").get(isAuthenticatedUser, getVendorDetails);

router.route("/allvendors").get(isAuthenticatedUser, getAllVendors);
// authorizeRoles("admin")

router.route("/updateVendor/:id")
  .put(isAuthenticatedUser, updateVendor)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteVendor);

module.exports = router;
