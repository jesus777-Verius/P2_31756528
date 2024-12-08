const express = require("express");

const router = express.Router();

const controllers = require("../controllers/appControllers.js")

router.get("/",controllers);

module.exports= router;