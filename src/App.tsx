import React from 'react';
import styled from 'styled-components';

import { useFetch } from './hooks/useFetch';

import { Image_URL } from './config/config';
import { PhotosWrapper } from './views/PhotosWrapper';

const Page = styled.div`
  background-color: #f7fafc;
  color: #1e293b;
  margin: 0;
`;

const MainContainer = styled.div`
  display: flex;
  margin-left: 2rem;
`;

function App() {
  const { data, loading, error } = useFetch(Image_URL);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Page>
      <MainContainer>
        {error && <div>{error}</div>}
        {data && <PhotosWrapper data={data} />}
      </MainContainer>
    </Page>
  );
}

export default App;
