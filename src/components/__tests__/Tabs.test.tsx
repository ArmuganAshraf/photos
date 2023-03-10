import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ImageContextType } from '../../types/ImageContextType';
import { listOfMockTabs } from '../../utilities/testUtils/mockData/mockTabData';
import { Tabs } from '../Tabs';
import { initialContextValue, renderWithProviders } from '../../utilities/testUtils/mockImageContext';

describe('Tabs', () => {
  test('renders tabs', () => {
    renderWithProviders(<Tabs tabs={listOfMockTabs} />);

    const tabs = screen.getAllByRole('button');

    expect(tabs).toHaveLength(2);
  });

  test('set selected Tab', () => {
    const setSelectedImageMockFn = jest.fn();
    const setSelectedTabMockFn = jest.fn();
    const contextValue: ImageContextType = {
      ...initialContextValue,
      setSelectedImage: setSelectedImageMockFn,
      setSelectedTab: setSelectedTabMockFn,
    };
    renderWithProviders(<Tabs tabs={listOfMockTabs} />, contextValue);

    userEvent.click(screen.getByText(/Favorited/));

    expect(setSelectedTabMockFn).toHaveBeenCalledWith('FAVORITED');
    expect(setSelectedImageMockFn).toHaveBeenCalledWith(undefined);
  });

  test('set border bottom for selected tab', () => {
    renderWithProviders(<Tabs tabs={listOfMockTabs} />);

    const actualTab = screen.getByText(/Recently Addded/);
    expect(actualTab).toHaveStyle(`
      border-bottom: 1px solid #4f45e4
    `);
  });

  test('no border bottom for unselected tab', () => {
    renderWithProviders(<Tabs tabs={listOfMockTabs} />);

    const actualTab = screen.getByText(/Favorited/);
    expect(actualTab).toHaveStyle(`
      border-bottom: none
    `);
  });
});
