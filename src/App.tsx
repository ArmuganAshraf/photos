import React, { useState } from 'react';
import { RecentlyAdded } from './components/RecentlyAdded/RecentlyAdded';
import styled from 'styled-components';
import { useFetch } from './components/RecentlyAdded/FetchData';
import { Favorited } from './components/Favorited/Favorited';

const MainContainer = styled.div`
  margin: 1rem 1rem 1rem 2rem;
`;

const TabsContainer = styled.div`
  border-bottom: 1px solid lightgrey;
`;

const Tabs = styled.button<{ selected: boolean }>`
  border: none;
  background-color: white;
  padding: 0 2rem 1rem 0;
  border-bottom: ${(props) => (props.selected ? 'cornflowerblue 2px solid' : 'none')};
`;

export interface Photo {
  id: string;
  url: string;
  filename: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  dimensions: {
    height: number;
    width: number;
  };
  resolution: {
    height: number;
    width: number;
  };
  sizeInBytes: number;
  sharedWith: [];
  favorited: boolean;
}

function App() {
  const url = 'https://agencyanalytics-api.vercel.app/images.json';
  const { data, loading, error } = useFetch(url);
  const [selectedTab, setSelectedTab] = useState('RecentlyAdded');

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <MainContainer>
      {error && <div>{error}</div>}
      <h1>Photos</h1>
      <TabsContainer>
        <Tabs onClick={() => setSelectedTab('RecentlyAdded')} selected={selectedTab === 'RecentlyAdded'}>
          Recently Added
        </Tabs>
        <Tabs onClick={() => setSelectedTab('Favorited')} selected={selectedTab === 'Favorited'}>
          Favorited
        </Tabs>
      </TabsContainer>
      {selectedTab === 'RecentlyAdded' ? <RecentlyAdded data={data} /> : <Favorited data={data} />}
    </MainContainer>
  );
}

export default App;
