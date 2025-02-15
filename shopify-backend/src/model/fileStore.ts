export type FileStorage = {
  icaps: any;
  ecdb: any;
  images: any;
  hierarchy: any;
  map: any;
};

let fileStorage: FileStorage = {
  icaps: null,
  ecdb: null,
  images: null,
  hierarchy: null,
  map: null,
};

export const setMap = (data: any): any => {
  fileStorage.map = data;
};

export const setHierarchy = (data: any): any => {
  fileStorage.hierarchy = data;
};

export const setImages = (data: any): any => {
  fileStorage.images = data;
};

export const setEcdb = (data: any): any => {
  fileStorage.ecdb = data;
};

export const setIcaps = (data: any): any => {
  fileStorage.icaps = data;
};

export const getMap = (): any => {
  return fileStorage.map;
};

export const getHierarchy = (): any => {
  return fileStorage.hierarchy;
};

export const getImages = (): any => {
  return fileStorage.images;
};

export const getEcdb = (): any => {
  return fileStorage.ecdb;
};

export const getIcaps = (): any => {
  return fileStorage.icaps;
};

export const getFileStorage = (): any => {
  return fileStorage;
};
