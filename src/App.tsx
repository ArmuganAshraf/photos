import React from 'react';
import { RecentlyAdded } from './components/RecentlyAdded/RecentlyAdded';
import styled from 'styled-components';

const MainContainer = styled.div`
  margin: 1rem 1rem 1rem 2rem;
`;

function App() {
  return (
    <MainContainer>
      <h1>Photos</h1>
      <RecentlyAdded />
    </MainContainer>
  );
}

export default App;
