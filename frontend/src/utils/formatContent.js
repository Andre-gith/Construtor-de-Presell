export default function formatContent(text, isLastStep = false) {
  if (!text) return "";

  let html = text
    .split("\n\n")
    .map((p) => `<p>${p}</p>`)
    .join("");

  if (isLastStep) {
    html += `<button onclick="redirect()">Continuar</button>`;
  } else {
    html += `<button onclick="nextStep()">Continuar</button>`;
  }

  return html;
}