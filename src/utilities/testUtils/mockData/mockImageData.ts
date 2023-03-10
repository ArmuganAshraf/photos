import { Image } from '../../../types/Image';

export const mockImageData: Image[] = [
  {
    id: '1',
    url: 'https://url.com/images/0.jpg',
    filename: 'file1.jpg',
    description: 'Laboriosam.',
    uploadedBy: 'John Doe',
    createdAt: '2013-07-15T08:23:20.462Z',
    updatedAt: '2022-12-16T12:41:33.736Z',
    dimensions: {
      height: 4800,
      width: 3200,
    },
    resolution: {
      height: 72,
      width: 72,
    },
    sizeInBytes: 4812732,
    sharedWith: [],
    favorited: true,
  },
  {
    id: '2',
    url: 'https://url.com/images/1.jpg',
    filename: 'file2.jpg',
    description: 'Consequatu.',
    uploadedBy: 'Jane Doe',
    createdAt: '2015-09-21T05:49:02.644Z',
    updatedAt: '2022-10-30T10:19:17.504Z',
    dimensions: {
      height: 2140,
      width: 3200,
    },
    resolution: {
      height: 72,
      width: 72,
    },
    sizeInBytes: 4312612,
    sharedWith: [],
    favorited: false,
  },
];
