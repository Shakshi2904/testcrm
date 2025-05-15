// routes/locationRoutes.js
const express = require("express");
const router = express.Router();
const locationController = require("../controllers/locationController");

router.get("/machines", locationController.getMachines);

module.exports = router;
