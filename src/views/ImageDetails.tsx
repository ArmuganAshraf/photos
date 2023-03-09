import React, { useContext } from 'react';
import styled, { css } from 'styled-components';

import FavoriteNotSelectedIcon from '../assets/favorite_not_selected.svg';
import FavoriteSelectedIcon from '../assets/favorite_selected.svg';
import { ImageInformation } from '../components/ImageInformation';
import { ImageContext } from '../context/imageContext';

import type { Image } from '../types/Image';
import { TAB_IDS } from '../types/TabIds';
import { devices } from '../utilities/devices';

import { convertByteToMB, formatDate } from '../utilities/utils';

const modalStyles = css`
  position: fixed;
  top: 0;
  left: 0;
  max-width: 100%;
  height: 100vh;
  box-sizing: border-box;
  overflow-y: scroll;
`;

const closeButtonStyles = css`
  display: block;
  float: right;
  margin-bottom: 1rem;
  background-color: white;
  border: none;
  font-size: 16px;
`;

const DetailsContainer = styled.div`
  max-width: 30%;
  padding: 2rem;
  border-left: 1px solid rgba(203, 213, 225, 0.5);
  background-color: white;
  box-sizing: fit-content;
  font-size: 12px;

  @media ${devices.mobile} {
    ${modalStyles}
  }

  @media ${devices.tablet} {
    ${modalStyles}
  }

  @media ${devices.largeMonitor} {
    height: 100vh;
    overflow-y: scroll;
    width: 25%;
  }
`;

const CloseButton = styled.button`
  display: none;

  @media ${devices.mobile} {
    ${closeButtonStyles}
  }

  @media ${devices.tablet} {
    ${closeButtonStyles}
  }
`;

const Image = styled.img`
  width: 100%;
  height: 300px;
  border-radius: 10px;

  @media ${devices.laptop} {
    height: 200px;
  }

  @media ${devices.tablet} {
    height: 320px;
  }
`;

const ImageName = styled.figcaption`
  font-size: 14px;
`;

const ImageBrief = styled.figure`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  width: 100%;
  margin: 0;
  padding: 0.5rem 0;
`;

const ImageSize = styled.div`
  color: #64748b;
`;
const FavoriteIcon = styled.img`
  width: 5%;
  height: 5%;
`;

const TableSection = styled.table`
  font-size: 18px;
  width: 100%;
`;

const TableCaption = styled.caption`
  text-align: start;
  border-bottom: 1px solid rgba(203, 213, 225, 0.5);
  margin-top: 2.5rem;
  padding-bottom: 1rem;
`;

const Section = styled.section`
  font-size: 18px;
  padding-top: 2.5rem;
`;

const DescriptionDetails = styled.p`
  color: #64748b;
  text-align: left;
  font-size: 14px;
  line-height: 22px;
`;

const Delete = styled.button`
  width: 100%;
  height: 2rem;
  border: 1px solid #cbd5e1;
  border-radius: 5px;
  background-color: white;
  margin-top: 1rem;
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

  const closeModal = () => {
    setSelectedImage(undefined);
  };

  return (
    <DetailsContainer>
      <CloseButton onClick={closeModal}>X</CloseButton>
      <Image src={url} alt={filename} />
      <div>
        <ImageBrief>
          <ImageName>{filename}</ImageName>
          <FavoriteIcon
            src={favorited ? FavoriteSelectedIcon : FavoriteNotSelectedIcon}
            alt={favorited ? 'favorited' : 'not favorited'}
            data-testid={'heart-icon'}
            onClick={() => toggleFavorited()}
          />
        </ImageBrief>
        <ImageSize>{convertByteToMB(sizeInBytes)} MB</ImageSize>
      </div>
      <TableSection>
        <TableCaption>Information</TableCaption>
        <ImageInformation label="Uploaded by" value={uploadedBy} />
        <ImageInformation label="Created" value={formatDate(createdAt)} />
        <ImageInformation label="Last Modified" value={formatDate(updatedAt)} />
        <ImageInformation label="Dimensions" value={`${dimensions.width} x ${dimensions.height}`} />
        <ImageInformation label="Resolution" value={`${resolution.width} x ${resolution.height}`} />
      </TableSection>
      {description && (
        <Section>
          <p>Description</p>
          <DescriptionDetails>{description}</DescriptionDetails>
        </Section>
      )}
      <Delete onClick={() => deleteSelectedImage()}>Delete</Delete>
    </DetailsContainer>
  );
}
