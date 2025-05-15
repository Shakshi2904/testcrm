const express = require("express");
const router = express.Router();
const { getAllComplaints } = require("../controllers/complaintsController");

router.get("/complaints", getAllComplaints);

module.exports = router;
