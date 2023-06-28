const express = require("express");
const router = express.Router();

// import controller
const userController = require("../controllers/user_controller");
const awaitHandler = require("../middleware/await_handler");

// all routes
router.get("/", awaitHandler, userController.getAllUsers);
router.get("/:id", awaitHandler, userController.getUserById);
router.post("/", userController.createUser);

module.exports = router;
