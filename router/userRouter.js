const express = require("express");
const userLoginController = require("../controllers/usersLoginController.js");
const userController = require("../controllers/usersController.js");
const router = express.Router();

router.get("/getUsers", userController.getUsers);
router.post("/register", userController.createUser);
router.post("/login", userLoginController.authLogin);

module.exports = router;
