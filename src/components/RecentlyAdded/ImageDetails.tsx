import React from 'react';
import styled from 'styled-components';
import favoriteNotSelectedIcon from '../../assets/FavoritedNotSelected.png';
import favoriteSelectedIcon from '../../assets/FavoritedSelected.png';
import type { Photo } from '../../types/photo';
import { convertByteToMB, formatDate } from '../../Utils/utils';

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

const ImageBrife = styled.div`
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

const InfoDetails = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-bottom: 1px solid lightgrey;
`;

const InfoTitle = styled.p`
  color: grey;
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

type ImageDetailsPropsTypes = {
  selectedImage: Photo;
  toggleFavorite: () => void;
  deleteSelectedImage: () => void;
};

export function ImageDetails({ selectedImage, toggleFavorite, deleteSelectedImage }: ImageDetailsPropsTypes) {
  console.log(selectedImage);
  const {
    url,
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

  return (
    <DetailsContainer>
      <Image src={url} alt="details" />
      <div>
        <ImageBrife>
          <p>{filename}</p>
          <FavoriteIcon
            src={favorited ? favoriteSelectedIcon : favoriteNotSelectedIcon}
            alt="heart icon"
            onClick={() => toggleFavorite()}
          />
        </ImageBrife>
        <ImageSize>{convertByteToMB(sizeInBytes)} MB</ImageSize>
      </div>
      <div>
        <h3>Information</h3>
        <InfoDetails>
          <InfoTitle>Uploaded by</InfoTitle>
          <p>{uploadedBy}</p>
        </InfoDetails>
        <InfoDetails>
          <InfoTitle>Created</InfoTitle>
          <p>{formatDate(createdAt)}</p>
        </InfoDetails>
        <InfoDetails>
          <InfoTitle>Last Modified</InfoTitle>
          <p>{formatDate(updatedAt)}</p>
        </InfoDetails>
        <InfoDetails>
          <InfoTitle>Dimensions</InfoTitle>
          <p>
            {dimensions.width} x {dimensions.height}
          </p>
        </InfoDetails>
        <InfoDetails>
          <InfoTitle>Resolution</InfoTitle>
          <p>
            {resolution.width} x {resolution.height}
          </p>
        </InfoDetails>
      </div>
      {description && (
        <DescriptionSection>
          <h3>Description</h3>
          <DescriptionDetails>{description}</DescriptionDetails>
        </DescriptionSection>
      )}
      <Delete onClick={deleteSelectedImage}>Delete</Delete>
    </DetailsContainer>
  );
}
