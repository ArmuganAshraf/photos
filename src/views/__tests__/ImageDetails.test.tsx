import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ImageContextType } from '../../types/ImageContextType';

import { ImageDetails } from '../ImageDetails';
import { mockImageData } from '../../utilities/testUtils/mockData/mockImageData';
import { initialContextValue, renderWithProviders } from '../../utilities/testUtils/mockImageContext';

describe('ImageDetails', () => {
  test('renders image details', () => {
    const contextValue: ImageContextType = { ...initialContextValue, selectedImage: mockImageData[0] };
    renderWithProviders(<ImageDetails />, contextValue);

    const actualImage = screen.getByAltText(/file1.jpg/);
    expect(actualImage).toBeInTheDocument();
    expect(actualImage).toHaveAttribute('src', 'https://url.com/images/0.jpg');
  });

  test('click favorite icon to toggle favorite image', () => {
    const setImagesMockFn = jest.fn();
    const contextValue: ImageContextType = {
      ...initialContextValue,
      selectedImage: mockImageData[1],
      setImages: setImagesMockFn,
    };
    renderWithProviders(<ImageDetails />, contextValue);

    const actualImage = screen.getByTestId('heart-icon');
    expect(actualImage).toHaveAttribute('alt', 'not favorited');

    userEvent.click(screen.getByTestId('heart-icon'));

    expect(setImagesMockFn).toHaveBeenCalled();
  });

  test('click delete button to remove image', () => {
    const setImagesMockFn = jest.fn();
    const setSelectedImageMockFn = jest.fn();
    const contextValue: ImageContextType = {
      ...initialContextValue,
      selectedImage: mockImageData[1],
      setImages: setImagesMockFn,
      setSelectedImage: setSelectedImageMockFn,
    };

    renderWithProviders(<ImageDetails />, contextValue);

    const button = screen.getByText(/Delete/);
    userEvent.click(button);

    expect(setImagesMockFn).toHaveBeenCalled();
    expect(setSelectedImageMockFn).toHaveBeenCalledWith(undefined);
  });
});
