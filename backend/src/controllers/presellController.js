const prisma = require("../prismaClient");

module.exports = {
  // ✅ CRIAR PRESELL
  async create(req, res) {
    try {
      const {
        title,
        slug,
        step1Content,
        step2Content,
        step3Content,
        redirectUrl,
      } = req.body;

      if (!title || !slug || !redirectUrl) {
        return res.status(400).json({
          error: "Preencha título, slug e link final",
        });
      }

      const userId = req.userId;

      if (!userId) {
        return res.status(401).json({
          error: "Usuário não autenticado",
        });
      }

      const presell = await prisma.presell.create({
        data: {
          title,
          slug,
          step1Content: step1Content || "",
          step2Content: step2Content || "",
          step3Content: step3Content || "",
          redirectUrl,
          user: {
            connect: { id: userId },
          },
        },
      });

      res.json(presell);
    } catch (error) {
      if (error.code === "P2002") {
        return res.status(400).json({
          error: "Esse slug já existe. Escolha outro.",
        });
      }

      console.error(error);

      res.status(500).json({
        error: "Erro ao criar presell",
      });
    }
  },

  // ✅ LISTAR PRESELLS DO USUÁRIO
  async list(req, res) {
    try {
      const presells = await prisma.presell.findMany({
        where: {
          userId: req.userId,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      res.json(presells);
    } catch (error) {
      res.status(500).json({ error: "Erro ao listar presells" });
    }
  },

  // ✅ ATUALIZAR PRESELL
  async update(req, res) {
    try {
      const { id } = req.params;

      const updated = await prisma.presell.update({
        where: {
          id: Number(id),
        },
        data: {
          ...req.body,
        },
      });

      res.json(updated);
    } catch (error) {
      if (error.code === "P2002") {
        return res.status(400).json({
          error: "Slug já está em uso",
        });
      }

      console.error(error);

      res.status(500).json({
        error: "Erro ao atualizar presell",
      });
    }
  },

  // ✅ DELETAR PRESELL
  async delete(req, res) {
    try {
      const { id } = req.params;

      await prisma.presell.delete({
        where: {
          id: Number(id),
        },
      });

      res.json({ message: "Presell deletada" });
    } catch (error) {
      res.status(500).json({ error: "Erro ao deletar presell" });
    }
  },

  // ✅ RENDERIZAR PRESELL (PÁGINA FINAL)
  async render(req, res) {
    try {
      const { slug } = req.params;

      const presell = await prisma.presell.findUnique({
        where: { slug },
      });

      if (!presell) {
        return res.status(404).send("Presell não encontrada");
      }

      res.send(`
        <html>
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${presell.title}</title>

            <style>
              body {
                margin: 0;
                font-family: Arial, sans-serif;
                background: linear-gradient(135deg, #0f172a, #020617);
                color: white;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
              }

              .container {
                max-width: 500px;
                width: 90%;
                text-align: center;
                background: #111827;
                padding: 30px;
                border-radius: 12px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                animation: fade 0.5s ease;
              }

              h1, h2 {
                margin-bottom: 15px;
              }

              p {
                color: #9ca3af;
                margin-bottom: 20px;
              }

              button {
                background: #22c55e;
                border: none;
                padding: 12px 20px;
                color: white;
                font-weight: bold;
                border-radius: 8px;
                cursor: pointer;
                transition: 0.3s;
              }

              button:hover {
                background: #16a34a;
              }

              .progress {
                height: 5px;
                background: #1f2937;
                margin-bottom: 20px;
                border-radius: 5px;
                overflow: hidden;
              }

              .bar {
                height: 100%;
                width: 33%;
                background: #22c55e;
                transition: width 0.3s;
              }

              @keyframes fade {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
              }
            </style>
          </head>

          <body>
            <div class="container">

              <div class="progress">
                <div class="bar" id="bar"></div>
              </div>

              <div id="content">${presell.step1Content}</div>

            </div>

            <script>
              let step = 1;

              const steps = [
                \`${presell.step1Content}\`,
                \`${presell.step2Content}\`,
                \`${presell.step3Content}\`
              ];

              document.body.addEventListener("click", () => {
                if (step < steps.length) {
                  document.getElementById("content").innerHTML = steps[step];
                  step++;

                  document.getElementById("bar").style.width = (step * 33) + "%";
                } else {
                  window.location.href = "${presell.redirectUrl}";
                }
              });
            </script>
          </body>
        </html>
      `);
    } catch (error) {
      res.status(500).send("Erro ao renderizar presell");
    }
  },
};