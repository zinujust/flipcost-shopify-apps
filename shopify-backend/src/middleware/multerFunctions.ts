import multer from "multer";
import type { Multer } from "multer";

export const upload: Multer = multer({
  limits: { fileSize: 100 * 1024 * 1024 },
  storage: multer.memoryStorage(),
});

export const uploadFields = upload.fields([
  { name: "icaps", maxCount: 1 },
  { name: "ecdb", maxCount: 1 },
  { name: "images", maxCount: 1 },
  { name: "hierarchy", maxCount: 1 },
  { name: "map", maxCount: 1 },
]);
