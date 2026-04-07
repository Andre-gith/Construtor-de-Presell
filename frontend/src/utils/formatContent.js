export default function formatContent(text, isLastStep = false) {
  if (!text) return "";

  // 🔥 REMOVE QUALQUER BOTÃO QUE O USUÁRIO TENHA DIGITADO
  text = text
    .replace(/<button.*?>.*?<\/button>/gi, "")
    .replace(/Continuar/gi, "");

  const parts = text.split("\n\n");

  let html = "";

  parts.forEach((p, index) => {
    if (index === 0) {
      html += `<h1 style="font-size:28px; font-weight:bold; margin-bottom:15px;">${p}</h1>`;
    } else {
      html += `<p style="margin-bottom:10px;">${p}</p>`;
    }
  });

  // 🔥 ADICIONA APENAS 1 BOTÃO
  if (isLastStep) {
    html += `<button onclick="redirect()" style="
      margin-top:20px;
      padding:12px 20px;
      background:#22c55e;
      color:white;
      border:none;
      border-radius:8px;
      cursor:pointer;
      font-weight:bold;
    ">Continuar</button>`;
  } else {
    html += `<button onclick="nextStep()" style="
      margin-top:20px;
      padding:12px 20px;
      background:#3b82f6;
      color:white;
      border:none;
      border-radius:8px;
      cursor:pointer;
      font-weight:bold;
    ">Continuar</button>`;
  }

  return html;
}