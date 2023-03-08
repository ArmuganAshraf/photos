import { render } from '@testing-library/react';
import React, { ReactElement } from 'react';
import { ImageContext } from '../context/imageContext';
import { mockImageData } from '../mocks/mockImageData';
import { ImageContextType } from '../types/ImageContextType';

export const initialContextValue: ImageContextType = {
  images: mockImageData,
  setImages: jest.fn(),
  selectedImage: undefined,
  setSelectedImage: jest.fn(),
  selectedTab: 'RECENTLYADDED',
  setSelectedTab: jest.fn(),
};

export const renderWithProviders = (component: ReactElement, value: ImageContextType = initialContextValue) => {
  const wrapper = ({ children }: any) => <ImageContext.Provider value={value}>{children}</ImageContext.Provider>;

  return render(component, { wrapper: wrapper });
};
