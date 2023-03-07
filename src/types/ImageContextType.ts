import { Image } from './Image';

export type ImageContextType = {
  images: Image[] | undefined;
  setImages: (images: Image[]) => void;
  selectedImage: Image | undefined;
  setSelectedImage: (image: Image) => void;
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
};
