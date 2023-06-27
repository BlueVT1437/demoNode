const express = require("express");
const router = express.Router();

// import controller
const productTypeController = require("../controllers/product_type_controller");
const awaitHandler = require("../middleware/await_handler");

// all routes
router.get("/", awaitHandler, productTypeController.getAllProductType);
router.post("/", awaitHandler, productTypeController.createProductType);

module.exports = router;
