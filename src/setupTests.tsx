import 'whatwg-fetch';

import '@testing-library/jest-dom';

import { server } from './utilities/testUtils/server';

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
