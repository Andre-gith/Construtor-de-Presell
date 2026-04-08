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

  // ✅ LISTAR PRESELLS
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

  // ✅ RENDERIZAR PRESELL (VERSÃO FINAL)
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
                background: linear-gradient(135deg, #020617, #0f172a);
                color: white;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                padding: 20px;
              }

              .container {
                max-width: 500px;
                width: 100%;
                text-align: center;
                background: #0f172a;
                padding: 30px;
                border-radius: 20px;
                box-shadow: 0 10px 40px rgba(0,0,0,0.6);
                border: 1px solid #1e293b;
                animation: fade 0.4s ease;
              }

              .progress {
                height: 6px;
                background: #1e293b;
                margin-bottom: 25px;
                border-radius: 10px;
                overflow: hidden;
              }

              .bar {
                height: 100%;
                width: 33%;
                background: linear-gradient(90deg,#22c55e,#4ade80);
                transition: width 0.3s;
              }

              #content {
                min-height: 150px;
              }

              button {
                margin-top: 25px;
                padding: 14px;
                width: 100%;
                background: linear-gradient(135deg,#3b82f6,#2563eb);
                color: white;
                border: none;
                border-radius: 12px;
                font-size: 16px;
                font-weight: bold;
                cursor: pointer;
                transition: 0.3s;
                box-shadow: 0 5px 20px rgba(0,0,0,0.3);
              }

              button:hover {
                transform: scale(1.03);
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

              <button id="btn" onclick="nextStep()">Continuar</button>

            </div>

            <script>
              let step = 1;

              const steps = [
                \`${presell.step1Content}\`,
                \`${presell.step2Content}\`,
                \`${presell.step3Content}\`
              ];

              function nextStep() {
                if (step < steps.length) {
                  document.getElementById("content").innerHTML = steps[step];
                  step++;

                  document.getElementById("bar").style.width = (step * 33) + "%";

                  if (step === 3) {
                    const btn = document.getElementById("btn");
                    btn.innerText = "Ver agora";
                    btn.style.background = "linear-gradient(135deg,#22c55e,#16a34a)";
                  }

                } else {
                  window.location.href = "${presell.redirectUrl}";
                }
              }
            </script>
          </body>
        </html>
      `);
    } catch (error) {
      res.status(500).send("Erro ao renderizar presell");
    }
  },
};