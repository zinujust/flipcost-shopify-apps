import type { Request, Response } from "express";
import express from "express";
import { uploadFields } from "../middleware/multerFunctions";
import { mergedData, readAndExtractSourceData } from "../utils/utilFunctions";

const router = express.Router();

debugger;
router.post(
  "/shopifyProductsUpload",
  uploadFields,
  (req: Request, res: Response): void => {
    const files = req.files as
      | { [fieldname: string]: Express.Multer.File[] }
      | undefined;
    if (
      !files?.["icaps"] ||
      !files?.["ecdb"] ||
      !files?.["images"] ||
      !files?.["hierarchy"] ||
      !files?.["map"]
    ) {
      res
        .status(400)
        .send("All files (icaps, ecdb, images, hierarchy, map) are required.");
    }

    try {
      const icapsBuffer = files?.["icaps"]?.[0]?.buffer;
      const ecdbBuffer = files?.["ecdb"]?.[0]?.buffer;
      const imagesBuffer = files?.["images"]?.[0]?.buffer;
      const hierarchyBuffer = files?.["hierarchy"]?.[0]?.buffer;
      const mapBuffer = files?.["map"]?.[0]?.buffer;

      let fileStorage = readAndExtractSourceData(
        icapsBuffer,
        ecdbBuffer,
        imagesBuffer,
        hierarchyBuffer,
        mapBuffer
      );

      if (
        !fileStorage.icaps ||
        !fileStorage.ecdb ||
        !fileStorage.images ||
        !fileStorage.hierarchy ||
        !fileStorage.map
      ) {
        res.status(400).send({ message: `An error occurred in fileStorage` });
      }

      let data: string = mergedData(
        fileStorage.icaps,
        fileStorage.ecdb,
        fileStorage.images,
        fileStorage.hierarchy,
        fileStorage.map
      );
      const bom = "\uFEFF";
      data = bom + data;

      res.setHeader("Content-Type", "text/csv");
      res.setHeader(
        "Content-Disposition",
        'attachment; filename="shopifyData.csv"'
      );

      res.status(200).send(data);
    } catch (error) {
      console.error("An error occurred in response:", error);
      res.status(500).send({ message: "An internal server error occurred." });
    }
  }
);

export default router;
