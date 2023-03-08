import React from 'react';
import styled from 'styled-components';

const InfoDetails = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-bottom: 1px solid lightgrey;
`;

const InfoTitle = styled.p`
  color: grey;
`;

type ImageInformationPropsTypes = {
  label: string;
  value: string;
};
export function ImageInformation({ label, value }: ImageInformationPropsTypes) {
  return (
    <InfoDetails>
      <InfoTitle>{label}</InfoTitle>
      <p>{value}</p>
    </InfoDetails>
  );
}
