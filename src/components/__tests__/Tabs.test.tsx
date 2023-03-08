import { render, screen } from '@testing-library/react';
import React, { ReactElement } from 'react';

import { ImageContext } from '../../context/imageContext';
import { ImageContextType } from '../../types/ImageContextType';
import userEvent from '@testing-library/user-event';
import { listOfMockTabs } from '../../mocks/mockTabData';
import { Tabs } from '../Tabs';

describe('Tabs', () => {
  test('renders tabs', () => {
    renderWithProviders(<Tabs tabs={listOfMockTabs} />);

    const tabs = screen.getAllByRole('button');

    expect(tabs.length).toEqual(2);
  });

  test('set selected Tab', () => {
    renderWithProviders(<Tabs tabs={listOfMockTabs} />);

    userEvent.click(screen.getByText('Old'));

    expect(setSelectedTabMockFn).toHaveBeenCalledWith('2');
    expect(setSelectedImageMockFn).toHaveBeenCalledWith(undefined);
  });

  test('set border bottom for selected tab', () => {
    renderWithProviders(<Tabs tabs={listOfMockTabs} />);

    const actualTab = screen.getByText('New');
    expect(actualTab).toHaveStyle(`
      border-bottom: cornflowerblue 2px solid
    `);
  });

  test('no border bottom for unselected tab', () => {
    renderWithProviders(<Tabs tabs={listOfMockTabs} />);

    const actualTab = screen.getByText('Old');
    expect(actualTab).toHaveStyle(`
      border-bottom: none
    `);
  });
});

const setSelectedTabMockFn = jest.fn();
const setSelectedImageMockFn = jest.fn();

const initialValue: ImageContextType = {
  images: [],
  setImages: jest.fn(),
  selectedImage: null,
  setSelectedImage: setSelectedImageMockFn,
  selectedTab: '1',
  setSelectedTab: setSelectedTabMockFn,
};

const renderWithProviders = (component: ReactElement, value: ImageContextType = initialValue) => {
  const wrapper = ({ children }: any) => <ImageContext.Provider value={value}>{children}</ImageContext.Provider>;

  return render(component, { wrapper: wrapper });
};
