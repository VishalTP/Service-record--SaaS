const express = require("express");
const {
  getAllService,
  createService,
  getServiceDetails,
  updateService,
  deleteService,
  serviceReport,
  sendWhatsAppMsg
} = require("../controllers/serviceController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();


router
  .route("/admin/service")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllService);

router
  .route("/admin/service/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createService);

  router.route("/admin/service/:id").get(getServiceDetails);
  
  router
  .route("/admin/service/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateService)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteService);
  
  router
  .route("/admin/serviceReport")
  .get(isAuthenticatedUser, authorizeRoles("admin"), serviceReport)
  
  router
  .route("/admin/service/whatsApp")
  .post(isAuthenticatedUser, authorizeRoles("admin"), sendWhatsAppMsg);

module.exports = router;
