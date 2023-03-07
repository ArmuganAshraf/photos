import React from 'react';
import styled from 'styled-components';
import { Tab } from '../types/tab';

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
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
};

export function Tabs({ tabs, selectedTab, setSelectedTab }: TabsPropsTypes) {
  return (
    <TabsContainer>
      {tabs.map((tab) => (
        <TabButton selected={selectedTab === tab.id} key={tab.id} onClick={() => setSelectedTab(tab.id)}>
          {tab.label}
        </TabButton>
      ))}
    </TabsContainer>
  );
}
