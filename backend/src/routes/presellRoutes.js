const express = require('express');
const router = express.Router();

const {
  getPresell,
  createPresell,
  getPresellBySlug
} = require('../controllers/presellController');

router.get('/', getPresell);
router.post('/', createPresell);
router.get('/:slug', getPresellBySlug);

module.exports = router;