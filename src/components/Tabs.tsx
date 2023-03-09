import React, { useContext } from 'react';
import styled from 'styled-components';
import { ImageContext } from '../context/imageContext';

import { Tab } from '../types/Tab';

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid rgba(203, 213, 225, 0.5);
`;

const TabButton = styled.button<{ selected: boolean }>`
  border: none;
  background-color: #f7fafc;
  padding: 0 0 1rem 0;
  margin-right: 2rem;
  border-bottom: ${(props) => (props.selected ? '#4f45e4 1px solid' : 'none')};
  color: ${(props) => (props.selected ? '#4f45e4' : '#1e293b')};
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
