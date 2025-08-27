export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const MAX_FILES = 5; // per request
export const ALLOWED_MIME_TYPES = [
  // Images
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/svg+xml",
  "image/gif",

  // Documents
  "application/pdf", // PDF files
  "application/msword", // .doc files
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx files

  // Text files
  "text/plain",
  "text/csv",

  // Archives
  "application/zip",
  "application/x-zip-compressed",
  "application/x-tar",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
  "application/vnd.ms-excel", // .xls
  "application/vnd.openxmlformats-officedocument.presentationml.presentation", // .pptx

  // Audio
  "audio/wav",
  "audio/webm",

  // Video
  "video/mp4",
  "video/webm",
];
