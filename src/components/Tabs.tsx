import React, { useContext } from 'react';
import styled from 'styled-components';
import { ImageContext } from '../context/imageContext';

import { Tab } from '../types/Tab';

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid lightgrey;
`;

const TabButton = styled.button<{ selected: boolean }>`
  border: none;
  background-color: #e8effa;
  padding: 0 2rem 1rem 0;
  border-bottom: ${(props) => (props.selected ? 'cornflowerblue 2px solid' : 'none')};
`;

type TabsPropsTypes = {
  tabs: Tab[];
};

export function Tabs({ tabs }: TabsPropsTypes) {
  const { selectedTab, setSelectedTab, setSelectedImage } = useContext(ImageContext);

  const onTabChanged = (id: string) => {
    setSelectedImage(undefined);
    setSelectedTab(id);
  };

  return (
    <TabsContainer>
      {tabs.map((tab) => (
        <TabButton selected={selectedTab === tab.id} key={tab.id} onClick={() => onTabChanged(tab.id)}>
          {tab.label}
        </TabButton>
      ))}
    </TabsContainer>
  );
}
