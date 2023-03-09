import React, { useContext } from 'react';
import styled from 'styled-components';

import { ImageGrid } from '../components/ImageGrid';
import { ImageContext } from '../context/imageContext';

import type { Image } from '../types/Image';
import { TAB_IDS } from '../types/TabIds';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

export function ImageGridWrapper() {
  const { images, selectedTab } = useContext(ImageContext);
  let imageList: Image[] = [];

  if (selectedTab === TAB_IDS.RecentlyAdded) {
    imageList = images.sort(
      (image_1: Image, image_2: Image) => new Date(image_2.createdAt).getTime() - new Date(image_1.createdAt).getTime(),
    );
  } else {
    imageList = images.filter((image: Image) => image.favorited);
  }

  return (
    <Wrapper>
      <ImageGrid images={imageList} />
    </Wrapper>
  );
}
