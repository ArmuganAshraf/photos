import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ImageGrid } from '../ImageGrid';
import { Image } from '../../types/Image';
import { ImageContextType } from '../../types/ImageContextType';
import { mockImageData } from '../../utilities/testUtils/mockData/mockImageData';
import { initialContextValue, renderWithProviders } from '../../utilities/testUtils/mockImageContext';

describe('ImageGrid', () => {
  test('renders list of images', async () => {
    renderWithProviders(<ImageGrid images={mockImageData} />);

    const countImage = await screen.findAllByRole('img');

    expect(countImage).toHaveLength(2);
  });

  test('renders image size in MB', () => {
    renderWithProviders(<ImageGrid images={mockImageData} />);

    const imageSizes = screen.getAllByText(/MB/);

    expect(imageSizes[0]).toHaveTextContent('4.6 MB');
    expect(imageSizes[1]).toHaveTextContent('4.1 MB');
  });

  test('set selected Image', () => {
    const setSelectedImageMockFn = jest.fn();
    const contextValue: ImageContextType = {
      ...initialContextValue,
      setSelectedImage: setSelectedImageMockFn,
    };
    const expectedImage: Image = mockImageData[1];
    renderWithProviders(<ImageGrid images={mockImageData} />, contextValue);

    userEvent.click(screen.getByAltText(expectedImage.filename));

    expect(setSelectedImageMockFn).toHaveBeenCalledWith(expectedImage);
  });

  test('set border for selected image', () => {
    const clickedImage: Image = mockImageData[0];
    const contextValue: ImageContextType = {
      ...initialContextValue,
      selectedImage: clickedImage,
    };
    renderWithProviders(<ImageGrid images={mockImageData} />, contextValue);

    const actualImage = screen.getByAltText(clickedImage.filename);
    expect(actualImage).toHaveStyle(`
      border: cornflowerblue 2px solid
    `);
  });

  test('no border for unclicked image', () => {
    const unclickedImage: Image = mockImageData[0];
    const clickedImage: Image = mockImageData[1];

    const contextValue: ImageContextType = {
      ...initialContextValue,
      selectedImage: clickedImage,
    };
    renderWithProviders(<ImageGrid images={mockImageData} />, contextValue);

    const actualImage = screen.getByAltText(unclickedImage.filename);
    expect(actualImage).toHaveStyle(`
      border: none
    `);
  });
});
