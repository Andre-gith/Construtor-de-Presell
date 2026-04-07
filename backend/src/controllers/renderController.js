import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// evitar quebra de HTML
function safe(content) {
  return (content || "")
    .replace(/`/g, "\\`")
    .replace(/\$/g, "\\$");
}

export const renderPresell = async (req, res) => {
  const { slug } = req.params;

  try {
    const presell = await prisma.presell.findUnique({
      where: { slug },
    });

    if (!presell) {
      return res.send("Presell não encontrada");
    }

    const step1 = safe(presell.step1Content);
    const step2 = safe(presell.step2Content);
    const step3 = safe(presell.step3Content);

    res.send(`
      <html>
        <head>
          <title>${presell.title}</title>

          <style>
            body {
              font-family: Arial;
              background: #0f172a;
              color: white;
              margin: 0;
            }

            .container {
              max-width: 700px;
              margin: auto;
              padding: 20px;
            }

            .content {
              background: #1e293b;
              padding: 25px;
              border-radius: 10px;
              min-height: 200px;
              animation: fadeIn 0.4s;
            }

            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(10px); }
              to { opacity: 1; transform: translateY(0); }
            }

            button {
              padding: 12px 20px;
              background: #22c55e;
              border: none;
              color: white;
              border-radius: 8px;
              cursor: pointer;
              margin-top: 20px;
            }

            .progress {
              height: 5px;
              background: #111;
            }

            .bar {
              height: 5px;
              width: 0%;
              background: #22c55e;
              transition: width 0.3s;
            }

            .modal {
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: rgba(0,0,0,0.8);
              display: none;
              justify-content: center;
              align-items: center;
            }

            .modal-box {
              background: #1e293b;
              padding: 30px;
              border-radius: 10px;
              text-align: center;
            }

            .cookie {
              position: fixed;
              bottom: 0;
              width: 100%;
              background: #111;
              padding: 15px;
              text-align: center;
              z-index: 9999;
            }
          </style>
        </head>

        <body>

          <div class="progress"><div class="bar" id="bar"></div></div>

          <div class="container">
            <div class="content" id="content"></div>
          </div>

          <div class="modal" id="modal">
            <div class="modal-box">
              <h2>Verificação necessária</h2>
              <p>Clique abaixo para continuar</p>
              <button onclick="closeModal()">Continuar</button>
            </div>
          </div>

          <script>
            const redirectUrl = "${presell.redirectUrl}";

            // =====================
            // STEPS (SPA FAKE)
            // =====================
            const steps = [
              \`${step1}\`,
              \`${step2}\`,
              \`${step3}\`
            ];

            let current = 0;

            const bar = document.getElementById("bar");
            const content = document.getElementById("content");

            function renderStep() {
              content.innerHTML = steps[current];
              bar.style.width = ((current + 1) / steps.length) * 100 + "%";
              bindClicks();
            }

            function nextStep() {
              content.innerHTML = "<p>Carregando...</p>";

              setTimeout(() => {
                current++;

                if (current < steps.length) {
                  renderStep();

                  if (current === 1) {
                    document.getElementById("modal").style.display = "flex";
                  }

                } else {
                  window.location.href = redirectUrl;
                }
              }, 800 + Math.random() * 1000);
            }

            function bindClicks() {
              document.querySelectorAll("button, a").forEach(el => {
                el.onclick = (e) => {
                  e.preventDefault();
                  nextStep();
                };
              });
            }

            function closeModal() {
              document.getElementById("modal").style.display = "none";
            }

            renderStep();

            // =====================
            // COOKIE + PRELOAD
            // =====================
            const lang = navigator.language || "en";

            const texts = {
              pt: { msg: "Este site usa cookies", btn: "Aceitar" },
              es: { msg: "Este sitio usa cookies", btn: "Aceptar" },
              en: { msg: "This site uses cookies", btn: "Accept" }
            };

            let t = texts.en;
            if (lang.startsWith("pt")) t = texts.pt;
            else if (lang.startsWith("es")) t = texts.es;

            function preloadAffiliate() {
              try {
                const iframe = document.createElement("iframe");
                iframe.style.display = "none";
                iframe.src = redirectUrl;
                document.body.appendChild(iframe);
              } catch {}
            }

            function showCookie() {
              if (localStorage.getItem("cookieAccepted")) return;

              const div = document.createElement("div");
              div.className = "cookie";
              div.innerHTML = \`
                \${t.msg}
                <button id="accept">\${t.btn}</button>
              \`;

              document.body.appendChild(div);

              document.getElementById("accept").onclick = () => {
                localStorage.setItem("cookieAccepted", "true");
                preloadAffiliate();
                div.remove();
              };
            }

            showCookie();

            setTimeout(() => {
              if (!localStorage.getItem("cookieAccepted")) {
                preloadAffiliate();
              }
            }, 4000);

            // =====================
            // TRACKING
            // =====================
            fetch("/tracking", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                slug: "${slug}",
                step: current
              })
            });

          </script>

        </body>
      </html>
    `);

  } catch (error) {
    console.error("ERRO:", error);
    res.status(500).send("Erro");
  }
};