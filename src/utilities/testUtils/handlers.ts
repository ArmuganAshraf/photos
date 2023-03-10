import { rest } from 'msw';

import { mockImageData } from './mockData/mockImageData';
import { mockImageUrl } from './mockData/mockUrls';

const mockResponse = mockImageData;

export const handlers = [
  rest.get(mockImageUrl, (req, res, ctx) => {
    return res(ctx.json(mockResponse));
  }),
];
