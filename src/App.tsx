import React, { useEffect, useState } from 'react';
import { RecentlyAdded } from './components/RecentlyAdded/RecentlyAdded';
import styled from 'styled-components';
import { useFetch } from './hooks/useFetch';
import { Favorited } from './components/Favorited/Favorited';
import { ImageDetails } from './components/RecentlyAdded/ImageDetails';
import { Tabs } from './components/Tabs';
import type { Photo } from './types/photo';
import type { Tab } from './types/tab';

const Page = styled.div`
  background-color: #e8effa;
  margin: 0;
`;

const MainContainer = styled.div`
  margin: 1rem 1rem 1rem 2rem;
  display: flex;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PhotosSection = styled.div`
  width: 100%;
`;

function App() {
  const url = 'https://agencyanalytics-api.vercel.app/images.json';
  const { data, loading, error } = useFetch(url);
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
  const [images, setImages] = useState<Photo[] | undefined>(undefined);
  const [selectedTab, setSelectedTab] = useState<string>(listOfTabs[0].id);
  const [selectedImage, setSelectedImage] = useState<Photo | undefined>(undefined);

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

  useEffect(() => {
    setImages(data);
  }, [data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Page>
      <MainContainer>
        {error && <div>{error}</div>}
        {images && (
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
        )}
      </MainContainer>
    </Page>
  );
}

export default App;
