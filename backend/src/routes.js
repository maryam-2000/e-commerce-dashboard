const express = require("express");
const router = express.Router();
const userController = require('./controllers/userController');
const productController = require('./controllers/productController');
const orderController = require('./controllers/orderController');

router.get('/', (req, res) => {
    res.send("Express App is running!")
})

// ===================== User ======================
router.post("/user/signup", userController.signup);
router.post("/user/login", userController.login);

// ===================== Product ====================
router.get("/allproducts", productController.allproducts);
router.post("/addproduct", productController.addproduct);
router.post("/removeproduct", productController.removeproduct);

// ====================== Order ======================
router.get("/allorders", orderController.allorders);
router.get("/filteredorders", orderController.filteredorders);
router.post("/createorder", orderController.createorder);
router.post("/removeorder", orderController.removeorder);

module.exports = router