function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatTextBlocks(text) {
  const blocks = String(text || "").split("\n\n").filter(Boolean);
  return blocks
    .map((block) => {
      const lines = block.split("\n").filter(Boolean);
      const isList = lines.every((line) => line.trim().startsWith("- "));
      if (isList) {
        const items = lines
          .map((line) => `<li>${escapeHtml(line.trim().slice(2))}</li>`)
          .join("");
        return `<ul>${items}</ul>`;
      }
      return `<p>${escapeHtml(block).replaceAll("\n", "<br />")}</p>`;
    })
    .join("");
}

function formatContentBlock(block) {
  if (block.type === "image") {
    return `<p><strong>[Imagem]</strong> ${escapeHtml(block.caption || block.alt || block.url)}</p>`;
  }
  if (block.type === "video") {
    return `<p><strong>[Vídeo]</strong> ${escapeHtml(block.title || block.url)} (${escapeHtml(block.url)})</p>`;
  }
  if (block.type === "link") {
    return `<p><strong>[Referência]</strong> ${escapeHtml(block.label || block.url)} — ${escapeHtml(block.url)}</p>`;
  }
  return formatTextBlocks(block.text || "");
}

export function exportModuleToPdf(courseModule, study, quiz = []) {
  if (typeof window === "undefined" || !courseModule) return;

  const sectionsHtml = (courseModule.sections || [])
    .map(
      (section, index) => `
      <section class="card">
        <h2>${index + 1}. ${escapeHtml(section.title)}</h2>
        ${(section.blocks || []).map(formatContentBlock).join("")}
      </section>
    `
    )
    .join("");

  const activityHtml = study?.activity
    ? `
      <section class="card">
        <h2>Na prática: ${escapeHtml(study.activity.title)}</h2>
        <p>${escapeHtml(study.activity.description || "")}</p>
        ${
          study.activity.steps?.length
            ? `<ol>${study.activity.steps.map((s) => `<li>${escapeHtml(s)}</li>`).join("")}</ol>`
            : ""
        }
      </section>
    `
    : "";

  const letters = ["A", "B", "C", "D", "E"];
  const quizHtml = quiz.length
    ? `
      <section class="quiz-section">
        <h2>Questões do Módulo (${quiz.length} perguntas)</h2>
        ${quiz
          .map((q, qi) => {
            const correctOption = q.options?.[q.answer];
            const optionsHtml = (q.options || [])
              .map(
                (opt, oi) =>
                  `<li><strong>${letters[oi] || oi + 1})</strong> ${escapeHtml(opt)}</li>`
              )
              .join("");
            return `
              <div class="question">
                <p class="q-title">${qi + 1}. ${escapeHtml(q.prompt)}</p>
                <ul class="options">${optionsHtml}</ul>
                ${
                  correctOption
                    ? `<p class="answer">Resposta correta: <strong>${letters[q.answer] || ""} — ${escapeHtml(correctOption)}</strong></p>`
                    : ""
                }
              </div>
            `;
          })
          .join("")}
      </section>
    `
    : "";

  const html = `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <title>${escapeHtml(courseModule.tag)} - ${escapeHtml(courseModule.title)}</title>
  <style>
    @page { margin: 16mm; }
    * { box-sizing: border-box; }
    body {
      font-family: "Segoe UI", Arial, sans-serif;
      color: #0f172a;
      line-height: 1.55;
      margin: 0;
      padding: 24px;
      max-width: 820px;
      margin-inline: auto;
    }
    header {
      border-bottom: 2px solid #0284c7;
      padding-bottom: 14px;
      margin-bottom: 20px;
    }
    .tag {
      display: inline-block;
      font-size: 12px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: #0284c7;
    }
    h1 { font-size: 24px; margin: 6px 0 8px; color: #0f172a; }
    h2 { font-size: 17px; margin: 0 0 10px; color: #0369a1; }
    p { margin: 0 0 10px; font-size: 14px; }
    ul, ol { margin: 0 0 10px; padding-left: 20px; font-size: 14px; }
    li { margin-bottom: 4px; }
    .meta { font-size: 13px; color: #475569; }
    .card, .question {
      border: 1px solid #cbd5e1;
      border-radius: 10px;
      padding: 14px 16px;
      margin-bottom: 14px;
      break-inside: avoid;
    }
    .quiz-section { margin-top: 24px; }
    .q-title { font-weight: 700; margin-bottom: 8px; }
    .options { list-style: none; padding-left: 0; margin-bottom: 8px; }
    .answer { font-size: 13px; color: #15803d; margin-bottom: 0; }
    @media print {
      body { padding: 0; }
    }
  </style>
</head>
<body>
  <header>
    <span class="tag">Manual Digital - Robô NAO · ${escapeHtml(courseModule.tag)}</span>
    <h1>${escapeHtml(courseModule.title)}</h1>
    ${study?.goal ? `<p class="meta"><strong>Objetivo:</strong> ${escapeHtml(study.goal)}</p>` : ""}
    ${courseModule.intro ? formatTextBlocks(courseModule.intro) : ""}
  </header>
  ${sectionsHtml}
  ${activityHtml}
  ${quizHtml}
</body>
</html>`;

  const printWindow = window.open("", "_blank", "width=920,height=720");
  if (!printWindow) {
    window.alert("Permita pop-ups para gerar e baixar o PDF do módulo.");
    return;
  }
  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();
  printWindow.focus();
  window.setTimeout(() => {
    printWindow.print();
  }, 250);
}
