import React from 'react';
import { Photo } from '../../App';
import styled from 'styled-components';

const ImagesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-left: 0;
  margin-top: 1rem;
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

type FavoritedTypes = {
  data: Photo[];
  selectedImage: Photo | undefined;
  setSelectedImage: (d: Photo) => void;
};

export function Favorited({ data, selectedImage, setSelectedImage }: FavoritedTypes) {
  return (
    <>
      <ImagesContainer>
        {data &&
          data
            .filter((d) => d.favorited)
            .map((d: Photo) => (
              <ImageCard key={d.id}>
                <Images
                  src={d.url}
                  alt="images"
                  selected={selectedImage && selectedImage.id === d.id}
                  onClick={() => setSelectedImage(d)}
                />
                <ImageTitle>{d.filename}</ImageTitle>
                <ImageSize>{(d.sizeInBytes / 1024 ** 2).toFixed(1)} MB</ImageSize>
              </ImageCard>
            ))}
      </ImagesContainer>
    </>
  );
}
