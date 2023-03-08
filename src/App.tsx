import React from 'react';
import styled from 'styled-components';

import { useFetch } from './hooks/useFetch';

import { Image_URL } from './config/config';
import { PhotosWrapper } from './views/PhotosWrapper';

const Page = styled.div`
  background-color: #e8effa;
  margin: 0;
`;

const MainContainer = styled.div`
  margin: 1rem 1rem 1rem 2rem;
  display: flex;
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
