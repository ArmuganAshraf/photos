import React, { useContext } from 'react';
import styled from 'styled-components';

import FavoriteNotSelectedIcon from '../assets/favorite_not_selected.svg';
import FavoriteSelectedIcon from '../assets/favorite_selected.svg';
import { ImageInformation } from '../components/ImageInformation';
import { ImageContext } from '../context/imageContext';

import type { Image } from '../types/Image';
import { TAB_IDS } from '../types/TabIds';

import { convertByteToMB, formatDate } from '../utils/utils';

const DetailsContainer = styled.div`
  max-width: 30%;
  padding: 1rem 2rem;
  border-left: 1px solid lightgrey;
  height: 100vh;
  background-color: white;
  box-sizing: fit-content;
  font-size: 12px;
`;

const Image = styled.img`
  width: 100%;
  height: 300px;
  border-radius: 10px;
`;

const ImageBrief = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  width: 100%;
`;

const ImageSize = styled.div`
  color: grey;
`;
const FavoriteIcon = styled.img`
  width: 5%;
  height: 5%;
`;

const DescriptionSection = styled.section`
  margin-top: 2.5rem;
`;
const DescriptionDetails = styled.p`
  color: grey;
  text-align: left;
  line-height: 22px;
`;

const Delete = styled.button`
  width: 100%;
  height: 2rem;
  border: 1px solid lightgrey;
  border-radius: 5px;
  background-color: white;
`;

export function ImageDetails() {
  const { images, setImages, selectedImage, setSelectedImage, selectedTab } = useContext(ImageContext);
  const {
    url,
    id,
    filename,
    sizeInBytes,
    createdAt,
    dimensions,
    updatedAt,
    uploadedBy,
    resolution,
    description,
    favorited,
  } = selectedImage;

  const toggleFavorited = () => {
    const updatedImages = [...images];
    const favoritedImage = updatedImages.find((image: Image) => image.id === id);
    favoritedImage.favorited = !favoritedImage.favorited;
    setImages(updatedImages);
    if (selectedTab === TAB_IDS.Favorited) {
      setSelectedImage(undefined);
    }
  };

  const deleteSelectedImage = () => {
    const updatedImages = images.filter((image: Image) => image.id !== id);
    setImages(updatedImages);
    setSelectedImage(undefined);
  };

  return (
    <DetailsContainer>
      <Image src={url} alt={filename} />
      <div>
        <ImageBrief>
          <p>{filename}</p>
          <FavoriteIcon
            src={favorited ? FavoriteSelectedIcon : FavoriteNotSelectedIcon}
            alt={favorited ? 'favorited' : 'not favorited'}
            data-testid={'heart-icon'}
            onClick={() => toggleFavorited()}
          />
        </ImageBrief>
        <ImageSize>{convertByteToMB(sizeInBytes)} MB</ImageSize>
      </div>
      <div>
        <h3>Information</h3>
        <ImageInformation label="Uploaded by" value={uploadedBy} />
        <ImageInformation label="Created" value={formatDate(createdAt)} />
        <ImageInformation label="Last Modified" value={formatDate(updatedAt)} />
        <ImageInformation label="Dimensions" value={`${dimensions.width} x ${dimensions.height}`} />
        <ImageInformation label="Resolution" value={`${resolution.width} x ${resolution.height}`} />
      </div>
      {description && (
        <DescriptionSection>
          <h3>Description</h3>
          <DescriptionDetails>{description}</DescriptionDetails>
        </DescriptionSection>
      )}
      <Delete onClick={() => deleteSelectedImage()}>Delete</Delete>
    </DetailsContainer>
  );
}
