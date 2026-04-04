const prisma = require('../prisma/client');

exports.createTracking = async (req, res) => {
  try {
    const { slug, utm_source, utm_campaign } = req.body;

    const tracking = await prisma.tracking.create({
      data: {
        slug,
        utm_source,
        utm_campaign
      }
    });

    res.json(tracking);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao salvar tracking' });
  }
};