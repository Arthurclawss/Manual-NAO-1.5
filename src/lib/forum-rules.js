export const FORUM_CATEGORIES = {
  duvidas: "Dúvidas e primeiros passos",
  projetos: "Projetos com o NAO",
  choregraphe: "Choregraphe e programação",
  atividades: "Atividades em aula",
  recursos: "Arquivos e recursos",
};

export const TOPIC_TITLE_LIMIT = 140;
export const TOPIC_BODY_LIMIT = 6000;
export const REPLY_LIMIT = 3000;
export const ATTACHMENT_LIMIT = 3;
export const FILE_BYTES_LIMIT = 3 * 1024 * 1024;
export const TOTAL_FILE_BYTES_LIMIT = 4 * 1024 * 1024;

const fileExtensions = ["crg", "xar", "pml", "pkg", "py", "js", "json", "xml", "yaml", "yml", "ipynb", "ino", "cpp", "h", "txt", "md", "csv", "pdf", "docx", "pptx", "xlsx", "png", "jpg", "jpeg", "webp", "gif", "zip", "gz", "log"];
export const FILE_ACCEPT = fileExtensions.map((extension) => `.${extension}`).join(",");

export function isForumCategory(category) {
  return typeof category === "string" && Object.hasOwn(FORUM_CATEGORIES, category);
}

export function canModerate(role) {
  return role === "admin" || role === "moderator";
}

export function isForumId(value) {
  return typeof value === "string" && /^[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}$/.test(value);
}

export function getAttachmentError(files) {
  if (files.length > ATTACHMENT_LIMIT) return "Selecione até 3 arquivos.";

  let totalBytes = 0;
  for (const file of files) {
    const extension = file.name.split(".").pop()?.toLowerCase();
    if (!file.name.includes(".") || !fileExtensions.includes(extension)) return `Formato não aceito: ${file.name}.`;
    if (file.size === 0) return `O arquivo ${file.name} está vazio.`;
    if (file.size > FILE_BYTES_LIMIT) return `O arquivo ${file.name} ultrapassa 3 MB.`;
    totalBytes += file.size;
  }

  if (totalBytes > TOTAL_FILE_BYTES_LIMIT) return "Os anexos podem somar até 4 MB por publicação.";
  return "";
}
