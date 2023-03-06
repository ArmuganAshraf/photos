import React, { useState } from 'react';
import styled from 'styled-components';
import { useFetch } from './FetchData';

const Title = styled.h5`
  font-family: Arial;
  font-size: 15px;
`;

const ImagesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-left: 0;
`;

const ImageCard = styled.div`
  width: 5rem;
  height: 7rem;
  font-size: 12px;
  margin: 0 4rem 2rem 0;
`;

const Images = styled.img<{ selected: boolean }>`
  border-radius: 10px;
  width: 120px;
  height: 90px;
  margin-bottom: 0;
  padding: 0.1rem;
  border: ${(props) => (props.selected ? 'cornflowerblue 2px solid' : 'none')};
`;

const ImageTitle = styled.h5`
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 110px;
`;

const ImageSize = styled.h5`
  color: grey;
  margin-top: 5px;
`;

interface Photo {
  id: string;
  url: string;
  filename: string;
  description: string;
  createdAt: string;
  updatedAt: string;
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

export function RecentlyAdded() {
  const url = 'https://agencyanalytics-api.vercel.app/images.json';
  const { data, loading, error } = useFetch(url);
  const [selectedImage, setSelectedImage] = useState<Photo | undefined>(undefined);

  if (loading) {
    return <div>Loading...</div>;
  }

  const sortedData = data.sort(
    (a: Photo, b: Photo) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
  console.log(sortedData);

  return (
    <>
      <Title>Recently Added</Title>
      {error && <div>{error}</div>}
      <ImagesContainer>
        {sortedData &&
          sortedData.map((d: Photo) => (
            <ImageCard key={d.id}>
              <Images
                src={d.url}
                alt="images"
                selected={selectedImage && selectedImage.id === d.id}
                onClick={() => setSelectedImage(d)}
              />
              <ImageTitle>{d.filename}</ImageTitle>
              <ImageSize>{(d.sizeInBytes / 1024 ** 2).toFixed(2)} MB</ImageSize>
            </ImageCard>
          ))}
      </ImagesContainer>
    </>
  );
}
