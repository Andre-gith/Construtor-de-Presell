const express = require("express");
const router = express.Router();

const presellController = require("../controllers/presellController");
const authMiddleware = require("../middlewares/authMiddleware");

// 🔐 ROTAS PRIVADAS (precisam de login)
router.post("/presell", authMiddleware, presellController.create);
router.get("/presell", authMiddleware, presellController.list);
router.put("/presell/:id", authMiddleware, presellController.update);
router.delete("/presell/:id", authMiddleware, presellController.delete);

// 🌐 ROTA PÚBLICA (não precisa de login)
router.get("/presell/:slug", presellController.render);

module.exports = router;