import { render } from '@testing-library/react';
import React, { ReactElement, ReactNode } from 'react';

import { ImageContext } from '../../context/imageContext';
import { mockImageData } from './mockData/mockImageData';
import { ImageContextType } from '../../types/ImageContextType';

export const initialContextValue: ImageContextType = {
  images: mockImageData,
  setImages: jest.fn(),
  selectedImage: undefined,
  setSelectedImage: jest.fn(),
  selectedTab: 'RECENTLYADDED',
  setSelectedTab: jest.fn(),
};

type WrapperProps = {
  children: ReactNode;
};

export const renderWithProviders = (component: ReactElement, value: ImageContextType = initialContextValue) => {
  const wrapper = ({ children }: WrapperProps) => (
    <ImageContext.Provider value={value}>{children}</ImageContext.Provider>
  );

  return render(component, { wrapper: wrapper });
};
