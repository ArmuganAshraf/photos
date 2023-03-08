import { act, render, screen, waitFor } from '@testing-library/react';
import React, { ReactElement } from 'react';

import { ImageContext } from '../../context/imageContext';
import { ImageContextType } from '../../types/ImageContextType';

import { ImageDetails } from '../ImageDetails';
import { mockImageData } from '../../mocks/mockImageData';
import userEvent from '@testing-library/user-event';

describe('ImageDetails', () => {
  test('renders image details', () => {
    renderWithProviders(<ImageDetails />);

    const actualImage = screen.getByAltText(/file1.jpg/);
    expect(actualImage).toBeInTheDocument();
    expect(actualImage).toHaveAttribute('src', 'https://url.com/images/0.jpg');
  });

  test('click favorite icon to toggle favorite image', () => {
    const contextValue: ImageContextType = { ...initialValue, selectedImage: mockImageData[1] };
    renderWithProviders(<ImageDetails />, contextValue);

    const actualImage = screen.getByTestId('heart-icon');
    expect(actualImage).toHaveAttribute('alt', 'not favorited');

    userEvent.click(screen.getByTestId('heart-icon'));

    expect(setImagesMockFn).toHaveBeenCalled();
  });

  test('click delete button to remove image', () => {
    renderWithProviders(<ImageDetails />);

    const button = screen.getByText(/Delete/);

    userEvent.click(button);

    expect(setImagesMockFn).toHaveBeenCalled();
    expect(setSelectedImageMockFn).toHaveBeenCalledWith(undefined);
  });
});

const setImagesMockFn = jest.fn();
const setSelectedTabMockFn = jest.fn();
const setSelectedImageMockFn = jest.fn();

const initialValue: ImageContextType = {
  images: mockImageData,
  setImages: setImagesMockFn,
  selectedImage: mockImageData[0],
  setSelectedImage: setSelectedImageMockFn,
  selectedTab: '0',
  setSelectedTab: setSelectedTabMockFn,
};

const renderWithProviders = (component: ReactElement, value: ImageContextType = initialValue) => {
  const wrapper = ({ children }: any) => <ImageContext.Provider value={value}>{children}</ImageContext.Provider>;

  return render(component, { wrapper: wrapper });
};
