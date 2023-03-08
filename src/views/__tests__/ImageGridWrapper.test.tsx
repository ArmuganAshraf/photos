import { screen } from '@testing-library/react';
import React from 'react';

import { ImageContextType } from '../../types/ImageContextType';

import { ImageGridWrapper } from '../ImageGridWrapper';
import { initialContextValue, renderWithProviders } from '../../config/mockImageContext';

describe('Image Grid Wrapper', () => {
  test('renders image grid desc sorted by created date when recently added tab is selected', () => {
    renderWithProviders(<ImageGridWrapper />);

    const images = screen.getAllByRole('img');

    expect(images[0]).toHaveAttribute('alt', 'file2.jpg');
    expect(images[1]).toHaveAttribute('alt', 'file1.jpg');
  });

  test('renders only favorited images in the image grid when favorited tab is selected', () => {
    const contextValue: ImageContextType = { ...initialContextValue, selectedTab: 'FAVORITED' };
    renderWithProviders(<ImageGridWrapper />, contextValue);

    const images = screen.getAllByRole('img');

    expect(images).toHaveLength(1);
    expect(images[0]).toHaveAttribute('alt', 'file1.jpg');
  });
});
