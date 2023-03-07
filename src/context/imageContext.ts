import { createContext } from 'react';

import { ImageContextType } from '../types/ImageContextType';

export const ImageContext = createContext<ImageContextType | undefined>(undefined);
