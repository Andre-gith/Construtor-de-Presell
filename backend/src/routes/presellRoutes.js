const express = require("express");
const router = express.Router();

const presellController = require("../controllers/presellController");

router.get("/", presellController.listPresells); // 🔥 LISTAR
router.post("/", presellController.createPresell);
router.get("/:slug", presellController.getPresellBySlug);

module.exports = router;