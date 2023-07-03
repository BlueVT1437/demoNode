const express = require("express");
const router = express.Router();

// import controller
const productController = require("../controllers/product_controller");
const awaitHandler = require("../middleware/await_handler");
const checkRole = require("../middleware/check_role")

// all routes
router.get("/", awaitHandler, productController.getProducts);
router.post("/", awaitHandler, productController.createProduct);
router.delete("/:id", awaitHandler, checkRole, productController.deleteProduct);

module.exports = router;
