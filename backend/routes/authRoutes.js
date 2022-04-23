const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const authMiddleware = require("../controllers/authMiddleware");
const exntendedAuthController = require('../controllers/extendedAuthController');
const { verify } = authMiddleware;

router.post("/api/signup", authController.signup);
router.post("/api/login", authController.login);
router.post("/api/isAuth", authController.isAuth);
router.post("/api/profileUpload", verify, authController.profileUpload);
router.get("/api/retrieveProfile", verify, authController.retrieveProfile);
router.post("/api/sell-product", verify, authController.sellProduct);
router.post("/api/products", verify, authController.retrieveProducts);
router.post("/api/inventory", verify, exntendedAuthController.inventory);
router.post("/api/deleteProduct", verify, exntendedAuthController.deleteProduct);
router.post("/api/getProduct", verify, exntendedAuthController.getProduct);
router.post("/api/updateProduct", verify, exntendedAuthController.updateProduct);
router.post("/api/addToCart", verify, exntendedAuthController.addToCart);
router.post("/api/updateQuantity", verify, exntendedAuthController.updateQuantity);
router.post("/api/payment", verify, exntendedAuthController.payment);
router.post("/api/checkAvailability", verify, exntendedAuthController.checkAvailability);
router.post("/api/update-name", verify, exntendedAuthController.updateName);
router.post("/api/update-password", verify, exntendedAuthController.updatePassword);
router.post("/api/displayProduct", verify, exntendedAuthController.displayProduct);
router.post("/api/addToCartWithScreen", verify, exntendedAuthController.addToCartWithScreen);
router.post("/api/sellingProduct", verify, exntendedAuthController.sellingProduct);

module.exports = router;