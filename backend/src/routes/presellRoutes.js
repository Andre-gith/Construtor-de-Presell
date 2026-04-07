const express = require("express");
const router = express.Router();

const presellController = require("../controllers/presellController");
const authMiddleware = require("../middlewares/authMiddleware");

// 🔐 ROTAS PRIVADAS (precisam de login)
router.post("/", authMiddleware, presellController.create);
router.get("/", authMiddleware, presellController.list);
router.put("/:id", authMiddleware, presellController.update);
router.delete("/:id", authMiddleware, presellController.delete);

// 🌐 ROTA PÚBLICA (não precisa de login)
router.get("/:slug", presellController.render);

module.exports = router;