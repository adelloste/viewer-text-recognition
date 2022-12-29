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
  file_path: string;
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
  count_collections: number;
  count_pages: number;
  count_lines: number;
  collections: Collection[];
};

export type Collection = {
  id: string;
  name: string;
  creation_date: string;
  last_update: string;
  children: Collection[];
  description?: string;
  count_pages?: number;
  count_lines?: number;
};
