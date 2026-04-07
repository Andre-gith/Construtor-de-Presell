export default function formatContent(text) {
  if (!text) return "";

  // 🔥 REMOVE QUALQUER BOTÃO ANTIGO
  text = text.replace(/<button.*?>.*?<\/button>/gi, "");

  // 🔥 QUEBRA LINHAS SIMPLES
  const lines = text
    .split("\n")
    .map(line => line.trim())
    .filter(line => line !== "");

  let html = "";

  lines.forEach((line, index) => {
    if (index === 0) {
      // 🔥 TÍTULO PRINCIPAL
      html += `
        <h1 style="
          font-size:28px;
          font-weight:bold;
          margin-bottom:20px;
          text-align:center;
          line-height:1.3;
        ">
          ${line}
        </h1>
      `;
    } else {
      // 🔥 TEXTO NORMAL
      html += `
        <p style="
          margin-bottom:16px;
          font-size:18px;
          color:#cbd5e1;
          text-align:center;
          line-height:1.5;
        ">
          ${line}
        </p>
      `;
    }
  });

  return html;
}