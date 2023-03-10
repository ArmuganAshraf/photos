import React from 'react';
import styled from 'styled-components';

const InfoDetails = styled.li`
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-bottom: 1px solid rgba(203, 213, 225, 0.5);
  padding: 1rem 0;
  font-size: 14px;
  list-style-type: none;
`;

const InfoTitle = styled.label`
  color: #64748b;
`;

const InfoValue = styled.label``;

type ImageInformationPropsTypes = {
  label: string;
  value: string;
};
export function ImageInformation({ label, value }: ImageInformationPropsTypes) {
  return (
    <InfoDetails>
      <InfoTitle>{label}</InfoTitle>
      <InfoValue>{value}</InfoValue>
    </InfoDetails>
  );
}
