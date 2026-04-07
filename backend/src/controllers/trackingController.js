const prisma = require("../prismaClient");

module.exports = {
  async track(req, res) {
    try {
      const { slug, step, utm_source, utm_campaign } = req.body;

      await prisma.tracking.create({
        data: {
          slug,
          step,
          utm_source,
          utm_campaign,
        },
      });

      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Erro ao salvar tracking" });
    }
  },
};