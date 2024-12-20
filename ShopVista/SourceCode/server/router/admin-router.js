const express = require("express");
const adminController = require("../controllers/admin-controllers");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");
const adminMiddlewareware = require("../middlewares/admin-middleware");


router.route("/users").get(authMiddleware, adminMiddlewareware, adminController.getAllUsers);
router.route("/contacts").get(authMiddleware, adminController.getAllContacts);
router.route("/contacts/delete/:id").delete(authMiddleware,adminMiddlewareware,adminController.deleteContactById);
router.route("/users/:id").get(authMiddleware,adminMiddlewareware,adminController.getUserById);
router.route("/users/update/:id").patch(authMiddleware,adminMiddlewareware,adminController.updateUserById);
router.route("/users/delete/:id").delete(authMiddleware,adminMiddlewareware,adminController.deleteUserById);
//get services for admin
router.route("/services/:id").get(authMiddleware,adminMiddlewareware,adminController.getServiceById);
router.route("/services/update/:id").patch(authMiddleware,adminMiddlewareware,adminController.updateServiceById);
router.route("/services/delete/:id").delete(authMiddleware,adminMiddlewareware,adminController.deleteServiceById);

module.exports = router;