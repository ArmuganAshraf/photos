import React, { useState } from 'react';
import styled from 'styled-components';

import { ImageDetails } from './ImageDetails';

import { Tabs } from '../components/Tabs';

import type { Image } from '../types/Image';
import type { Tab } from '../types/Tab';

import { TAB_IDS } from '../types/TabIds';
import { ImageGridWrapper } from './ImageGridWrapper';
import { ImageContext } from '../context/imageContext';
import { devices } from '../utilities/devices';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Header = styled.h1`
  font-size: 22px;
  padding: 1rem 0;

  @media ${devices.mobile} {
    text-align: center;
  }
`;

const PhotosSection = styled.main`
  width: 100%;
`;

type PhotosWrapperPropsTypes = {
  data: Image[];
};

export function PhotosWrapper({ data: imageData }: PhotosWrapperPropsTypes) {
  const listOfTabs: Tab[] = [
    {
      id: TAB_IDS.RecentlyAdded,
      label: 'Recently Added',
      selected: true,
    },
    {
      id: TAB_IDS.Favorited,
      label: 'Favorited',
      selected: false,
    },
  ];

  const [selectedTab, setSelectedTab] = useState<string>(listOfTabs[0].id);
  const [clickedImage, setClickedImage] = useState<Image | undefined>(undefined);
  const [images, setImages] = useState<Image[]>(imageData);

  return (
    <ImageContext.Provider
      value={{
        images: images,
        setImages: setImages,
        selectedImage: clickedImage,
        setSelectedImage: setClickedImage,
        selectedTab: selectedTab,
        setSelectedTab: setSelectedTab,
      }}
    >
      <Container>
        <PhotosSection>
          <Header>Photos</Header>
          <Tabs tabs={listOfTabs} />
          <ImageGridWrapper />
        </PhotosSection>
        {clickedImage && <ImageDetails />}
      </Container>
    </ImageContext.Provider>
  );
}
