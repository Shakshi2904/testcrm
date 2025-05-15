// routes/partRoutes.js
const express = require("express");
const router = express.Router();
const partController = require("../controllers/partController");

router.get("/cities", partController.getCities);
router.get("/addresses/:city", partController.getAddresses);
router.get("/machines/:addressId", partController.getMachinesWithParts);

module.exports = router;
