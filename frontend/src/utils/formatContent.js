export default function formatContent(text) {
  if (!text) return "";

  text = text.replace(/<button.*?>.*?<\/button>/gi, "");

  const lines = text
    .split("\n")
    .map(line => line.trim())
    .filter(line => line !== "");

  let html = "";

  lines.forEach((line, index) => {
    if (index === 0) {
      html += `
        <h1 style="
          font-size:28px;
          font-weight:bold;
          margin-bottom:20px;
          text-align:center;
        ">
          ${line}
        </h1>
      `;
    } else {
      html += `
        <p style="
          margin-bottom:16px;
          font-size:18px;
          color:#cbd5e1;
          text-align:center;
        ">
          ${line}
        </p>
      `;
    }
  });

  return html;
}