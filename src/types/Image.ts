export interface Image {
  id: string;
  url: string;
  filename: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  uploadedBy: string;
  dimensions: {
    height: number;
    width: number;
  };
  resolution: {
    height: number;
    width: number;
  };
  sizeInBytes: number;
  sharedWith: [];
  favorited: boolean;
}
