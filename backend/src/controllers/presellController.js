const prisma = require('../prisma/client');

// 🔹 TESTE API
exports.getPresell = (req, res) => {
  res.send('API rodando 🚀');
};

// 🔹 LISTAR TODAS PRESELLS
exports.listPresells = async (req, res) => {
  try {
    const presells = await prisma.presell.findMany({
      orderBy: {
        createdAt: "desc"
      }
    });

    res.json(presells);

  } catch (error) {
    console.error("ERRO AO LISTAR:", error);
    res.status(500).json({ error: "Erro ao buscar presells" });
  }
};

// 🔹 CRIAR PRESELL
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
    console.error("ERRO AO CRIAR:", error);

    // 🔥 Slug duplicado
    if (error.code === "P2002") {
      return res.status(400).json({
        error: "Slug já existe. Escolha outro."
      });
    }

    res.status(500).json({ error: "Erro ao criar presell" });
  }
};

// 🔹 BUSCAR PRESELL POR SLUG + TRACKING
exports.getPresellBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const page = await prisma.presell.findUnique({
      where: { slug }
    });

    if (!page) {
      return res.status(404).send("Página não encontrada");
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

      // 🔥 ENVIA TRACKING
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

      // 🔥 REDIRECIONAMENTO DINÂMICO
      setTimeout(() => {
        window.location.href = "${page.redirectUrl || 'https://google.com'}";
      }, 8000);
    </script>
    `;

    res.send(page.content + script);

  } catch (error) {
    console.error("ERRO AO BUSCAR:", error);
    res.status(500).send("Erro no servidor");
  }
};