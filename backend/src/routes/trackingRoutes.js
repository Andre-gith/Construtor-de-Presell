const express = require('express');
const router = express.Router();

const { createTracking } = require('../controllers/trackingController');

router.post('/', createTracking);

module.exports = router;