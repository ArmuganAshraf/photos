import React, { useState } from 'react';
import styled from 'styled-components';

import { RecentlyAdded } from './RecentlyAdded';
import { Favorited } from './Favorited';
import { ImageDetails } from './ImageDetails';

import { Tabs } from '../components/Tabs';

import type { Photo } from '../types/Photo';
import type { Tab } from '../types/Tab';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PhotosSection = styled.div`
  width: 100%;
`;

type PhotosWrapperPropsTypes = {
  data: Photo[];
};

export function PhotosWrapper({ data: imageData }: PhotosWrapperPropsTypes) {
  const listOfTabs: Tab[] = [
    {
      id: 'RecentlyAdded',
      label: 'Recently Added',
      selected: true,
    },
    {
      id: 'Favorited',
      label: 'Favorited',
      selected: false,
    },
  ];

  const [selectedTab, setSelectedTab] = useState<string>(listOfTabs[0].id);
  const [selectedImage, setSelectedImage] = useState<Photo | undefined>(undefined);
  const [images, setImages] = useState<Photo[]>(imageData);

  const toggleFavorite = () => {
    const updatedImages = [...images];
    const favoritedImage = updatedImages.find((d: Photo) => d.id === selectedImage.id);
    favoritedImage.favorited = !favoritedImage.favorited;
    setImages(updatedImages);
  };

  const deleteSelectedImage = () => {
    const updatedImages = images.filter((d: Photo) => d.id !== selectedImage.id);
    setImages(updatedImages);
    setSelectedImage(undefined);
  };

  return (
    <Container>
      <PhotosSection>
        <h1>Photos</h1>
        <Tabs tabs={listOfTabs} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        {selectedTab === 'RecentlyAdded' ? (
          <RecentlyAdded data={images} selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
        ) : (
          <Favorited data={images} selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
        )}
      </PhotosSection>
      {selectedImage && (
        <ImageDetails
          selectedImage={selectedImage}
          toggleFavorite={toggleFavorite}
          deleteSelectedImage={deleteSelectedImage}
        />
      )}
    </Container>
  );
}
