import React, { useEffect, useState } from 'react';
import { RecentlyAdded } from './components/RecentlyAdded/RecentlyAdded';
import styled from 'styled-components';
import { useFetch } from './components/RecentlyAdded/FetchData';
import { Favorited } from './components/Favorited/Favorited';
import { ImageDetails } from './components/RecentlyAdded/ImageDetails';

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
  width: 60%;
`;

const TabsContainer = styled.div`
  border-bottom: 1px solid lightgrey;
  width: 95%;
`;

const Tabs = styled.button<{ selected: boolean }>`
  border: none;
  background-color: #e8effa;
  padding: 0 2rem 1rem 0;
  border-bottom: ${(props) => (props.selected ? 'cornflowerblue 2px solid' : 'none')};
`;

export interface Photo {
  id: string;
  url: string;
  filename: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  uploadedBy: string;
  dimensions: {
    height: number;
    width: number;
  };
  resolution: {
    height: number;
    width: number;
  };
  sizeInBytes: number;
  sharedWith: [];
  favorited: boolean;
}

function App() {
  const url = 'https://agencyanalytics-api.vercel.app/images.json';
  const { data, loading, error } = useFetch(url);
  const [images, setImages] = useState<Photo[] | undefined>(undefined);
  const [selectedTab, setSelectedTab] = useState('RecentlyAdded');
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

  console.log(images);
  return (
    <Page>
      <MainContainer>
        {error && <div>{error}</div>}
        {images && (
          <Container>
            <PhotosSection>
              <h1>Photos</h1>
              <TabsContainer>
                <Tabs onClick={() => setSelectedTab('RecentlyAdded')} selected={selectedTab === 'RecentlyAdded'}>
                  Recently Added
                </Tabs>
                <Tabs onClick={() => setSelectedTab('Favorited')} selected={selectedTab === 'Favorited'}>
                  Favorited
                </Tabs>
              </TabsContainer>
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
