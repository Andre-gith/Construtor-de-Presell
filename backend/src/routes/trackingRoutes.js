const express = require("express");
const router = express.Router();

const trackingController = require("../controllers/trackingController");

router.post("/", trackingController.createTracking);
router.get("/", trackingController.getTracking);

module.exports = router;