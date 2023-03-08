import { render, screen } from "@testing-library/react";
import React, { ReactElement } from "react";
import { ImageGrid } from "../ImageGrid";
import { Image } from '../../types/Image';
import { ImageContext } from "../../context/imageContext";
import { ImageContextType } from "../../types/ImageContextType";
import { mockImageData } from "../../mocks/mockImageData";
import userEvent from "@testing-library/user-event";


describe('ImageGrid', () => {
  test('renders list of images', async () => {
    renderWithProviders(<ImageGrid images={mockImageData}/>);

    const countImage = await screen.findAllByRole('img');

    expect(countImage.length).toEqual(2);
  })

  test('renders image size in MB', () => {
    renderWithProviders(<ImageGrid images={mockImageData}/>);

    const imageSizes = screen.getAllByText(/MB/);

    expect(imageSizes[0]).toHaveTextContent('4.6 MB');
    expect(imageSizes[1]).toHaveTextContent('4.1 MB');
  })

  test('set selected Image', () => {
    const expectedImage: Image = mockImageData[1];
    renderWithProviders(<ImageGrid images={mockImageData}/>);

    userEvent.click(screen.getByAltText(expectedImage.filename))
    
    expect(setSelectedImageMockFn).toHaveBeenCalledWith(expectedImage);
  })

  test('set border for selected image', () => {
    const clickedImage: Image = mockImageData[0];
    const value: ImageContextType = {...initialValue, selectedImage: clickedImage};

    renderWithProviders(<ImageGrid images={mockImageData}/>, value);
    
    const actualImage = screen.getByAltText(clickedImage.filename);
    expect(actualImage).toHaveStyle(`
      border: cornflowerblue 2px solid
    `)
  })

  test('no border for unclicked image', () => {
    const unclickedImage: Image = mockImageData[0];
    const clickedImage: Image = mockImageData[1];
    const value: ImageContextType = {...initialValue, selectedImage: clickedImage};

    renderWithProviders(<ImageGrid images={mockImageData}/>, value);
    
    const actualImage = screen.getByAltText(unclickedImage.filename);
    expect(actualImage).toHaveStyle(`
      border: none
    `)
  })
});

const setSelectedImageMockFn = jest.fn();
const initialValue: ImageContextType = {
  images: [],
  setImages: jest.fn(),
  selectedImage: null,
  setSelectedImage: setSelectedImageMockFn,
  selectedTab: '',
  setSelectedTab: jest.fn(),
};

const renderWithProviders = (component: ReactElement, value: ImageContextType = initialValue) => {
  const wrapper = ({children}: any) => (
    <ImageContext.Provider value={value}>
      {children}
    </ImageContext.Provider>
  )

  return render(component, {wrapper: wrapper})
}
