import multer from "multer";

const upload = multer({
  dest: "uploads/", // Folder to temporarily store the uploaded files
  limits: { fileSize: 100 * 1024 * 1024 }, // Limit the file size (optional)
});
