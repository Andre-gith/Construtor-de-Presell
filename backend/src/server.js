require("dotenv").config();

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const presellRoutes = require("./routes/presellRoutes");
const trackingRoutes = require("./routes/trackingRoutes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use("/auth", authRoutes);
app.use("/presell", presellRoutes);
app.use("/tracking", trackingRoutes);

// Teste
app.get("/", (req, res) => {
  res.send("API rodando 🚀");
});

// Start
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});