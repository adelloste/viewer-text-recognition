export type Resource = {
  info: Info;
  images: Image[];
  annotations: Annotation[];
  categories: Category[];
};

export type Info = {
  description: string;
};

export type Image = {
  id: number;
  width: number;
  height: number;
  file_name: string;
};

export type Annotation = {
  id: number | string;
  iscrowd: number;
  image_id: number;
  segmentation: number[];
  bbox: number[];
  area: number;
  transcription: string;
};

export type Category = {};

export type Lib = {
  countCollections: number;
  countVolumes: number;
  countPages: number;
  countLines: number;
  collections: Collection[];
};

export type Collection = {
  id: string;
  name: string;
  date: string;
  children?: Collection[];
};
