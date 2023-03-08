export interface Image {
  id: string;
  url: string;
  filename: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  uploadedBy: string;
  dimensions: ImageDimension;
  resolution: ImageDimension;
  sizeInBytes: number;
  sharedWith: [];
  favorited: boolean;
}

export interface ImageDimension {
  height: number;
  width: number;
}
