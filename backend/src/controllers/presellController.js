const prisma = require('../prisma/client');

// listar
exports.getPresell = (req, res) => {
  res.send('API rodando 🚀');
};

// criar presell
exports.createPresell = async (req, res) => {
  try {
    const { title, slug, content, redirectUrl } = req.body;

    const presell = await prisma.presell.create({
      data: {
        title,
        slug,
        content,
        redirectUrl,
      }
    });

    res.json(presell);

  } catch (error) {
    console.error(error);

    // 🔥 TRATAMENTO DE ERRO DE SLUG DUPLICADO
    if (error.code === "P2002") {
      return res.status(400).json({
        error: "Slug já existe. Escolha outro."
      });
    }

    res.status(500).json({ error: 'Erro ao criar presell' });
  }
};

// buscar por slug + tracking
exports.getPresellBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const page = await prisma.presell.findUnique({
      where: { slug }
    });

    if (!page) {
      return res.status(404).send('Página não encontrada');
    }

    const script = `
    <script>
      const params = new URLSearchParams(window.location.search);

      const utm_source = params.get('utm_source');
      const utm_campaign = params.get('utm_campaign');

      if (utm_source) {
        document.cookie = "utm_source=" + utm_source + "; path=/";
      }

      if (utm_campaign) {
        document.cookie = "utm_campaign=" + utm_campaign + "; path=/";
      }

      console.log("UTMs:", utm_source, utm_campaign);

      fetch("http://localhost:3000/tracking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          slug: "${slug}",
          utm_source,
          utm_campaign
        })
      });

      setTimeout(() => {
        window.location.href = "${page.redirectUrl || 'https://google.com'}";
      }, 8000);
    </script>
    `;

    res.send(page.content + script);

  } catch (error) {
    console.error(error);
    res.status(500).send('Erro no servidor');
  }
};