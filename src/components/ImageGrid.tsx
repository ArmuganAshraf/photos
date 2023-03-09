import React, { useContext } from 'react';
import styled from 'styled-components';
import { ImageContext } from '../context/imageContext';

import type { Image } from '../types/Image';
import { devices } from '../utilities/devices';

import { convertByteToMB } from '../utilities/utils';

const ImagesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-left: 0;
  margin-top: 1rem;

  @media ${devices.mobile} {
    justify-content: center;
    padding-right: 0;
  }
`;

const ImageCard = styled.div`
  width: 5.5rem;
  height: 7rem;
  font-size: 12px;
  margin: 0 4rem 2rem 0;

  @media ${devices.laptop} {
    width: 5.8rem;
  }

  @media ${devices.mobile} {
    width: 7rem;
    margin: 0 2rem 2rem 2rem;
  }

  @media ${devices.tablet} {
    width: 7.5rem;
  }
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
  color: #64748b;
  margin-top: 5px;
`;

type ImageGridPropsTypes = {
  images: Image[];
};

export function ImageGrid({ images }: ImageGridPropsTypes) {
  const { selectedImage, setSelectedImage } = useContext(ImageContext);
  return (
    <ImagesContainer>
      {images.map((image: Image) => (
        <ImageCard key={image.id}>
          <Images
            src={image.url}
            alt={image.filename}
            selected={selectedImage && selectedImage.id === image.id}
            onClick={() => setSelectedImage(image)}
          />
          <ImageTitle>{image.filename}</ImageTitle>
          <ImageSize>{convertByteToMB(image.sizeInBytes)} MB</ImageSize>
        </ImageCard>
      ))}
    </ImagesContainer>
  );
}
