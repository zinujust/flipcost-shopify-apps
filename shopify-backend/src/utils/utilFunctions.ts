import xlsx from "xlsx";
import {
  getFileStorage,
  setEcdb,
  setHierarchy,
  setIcaps,
  setImages,
  setMap,
  type FileStorage,
} from "../model/fileStore.ts";
import { createShopifyCSV } from "./shopifyFunctions.ts";

export function readAndExtractSourceData(
  icapsBuffer: any,
  ecdbBuffer: any,
  imagesBuffer: any,
  hierarchyBuffer: any,
  map: any
): FileStorage {
  try {
    setIcaps(readFromExcel(icapsBuffer));
    setEcdb(readFromExcel(ecdbBuffer));
    setImages(readImagesFromExcel(imagesBuffer));
    setHierarchy(readFromExcel(hierarchyBuffer));
    setMap(readFromExcel(map));
    return getFileStorage();
  } catch {
    throw new Error(`Error reading and extracting source data`);
  }
}

const readFromExcel = (file: File) => {
  try {
    const workbook = xlsx.read(file, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    return xlsx.utils.sheet_to_json(sheet);
  } catch {
    throw new Error(`Error reading from excel file`);
  }
};

const readImagesFromExcel = (file: File) => {
  try {
    const workbook = xlsx.read(file, { type: "buffer" });
    const sheet1Name = "MAIN IMAGE URLs";
    const sheet2Name = "ALTERNATE IMAGE URLs";

    if (
      !workbook.SheetNames.includes(sheet1Name) ||
      !workbook.SheetNames.includes(sheet2Name)
    ) {
      throw new Error(
        `Workbook does not contain the required sheets: ${sheet1Name}, ${sheet2Name}`
      );
    }

    const worksheet1 = workbook.Sheets[sheet1Name];
    const worksheet2 = workbook.Sheets[sheet2Name];
    const jsonMain = xlsx.utils.sheet_to_json(worksheet1);
    const jsonAlt = xlsx.utils.sheet_to_json(worksheet2);

    return buildSkuMap(jsonMain, jsonAlt);
  } catch {
    throw new Error(`Error reading images from excel file`);
  }
};

const buildSkuMap = (jsonMain: any, jsonAlt: any) => {
  try {
    const skuMap: any = {};

    jsonMain.forEach((item: any) => {
      const image: string = item["ITEM_IMG_URL_1500Variant"]?.endsWith(".JPG")
        ? item["ITEM_IMG_URL_1500Variant"]
        : item["ITEM_IMG_URL_750Variant"];
      skuMap[item["ITEMNUMBER"]] = { 1: image };
    });

    jsonAlt.forEach((item: any) => {
      const image: string = item["ALT_IMG_URL_1500Variant"]?.endsWith(".JPG")
        ? item["ALT_IMG_URL_1500Variant"]
        : item["ALT_IMG_URL_750Variant"];

      const nextID: number = Object.keys(skuMap[item["ITEMNUMBER"]]).length + 1;
      skuMap[item["ITEMNUMBER"]][nextID] = image;
    });

    return skuMap;
  } catch {
    throw new Error(`Error building SKU map`);
  }
};

const compareAndFilterIcapsWithSyndicatedItems = (json1: any, json2: any) => {
  try {
    if (!json1 || !json2) {
      return [];
    }

    const fetchSku = new Set(json2.map((item: any) => item["Item Number"]));

    const filteredData = json1.filter((item: any) =>
      fetchSku.has(item["Item Number"])
    );

    return filteredData.reduce((acc: any, item: any) => {
      acc[item["Item Number"]] = item;
      return acc;
    }, {});
  } catch {
    throw new Error(`Error comparing and filtering data`);
  }
};

export const mergedData = (
  icaps: any,
  ecdb: any,
  images: any,
  hierarchy: any,
  map: any
) => {
  try {
    const filteredData = compareAndFilterIcapsWithSyndicatedItems(icaps, ecdb);
    return createShopifyCSV(filteredData, images, hierarchy, map);
  } catch {
    throw new Error(`Error merging data`);
  }
};
