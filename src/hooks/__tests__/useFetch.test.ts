import { renderHook, waitFor } from '@testing-library/react';

import { useFetch } from '../useFetch';
import { mockImageUrl } from '../../utilities/testUtils/mockData/mockUrls';
import { mockImageData } from '../../utilities/testUtils/mockData/mockImageData';

describe('UseFetch hook', () => {
  test('should exist', () => {
    const { result } = renderHook(() => useFetch(mockImageUrl));
    expect(result.current).toBeDefined();
  });

  test('should return loading', () => {
    const { result } = renderHook(() => useFetch(mockImageUrl));
    expect(result.current.loading).toEqual(true);
  });

  test('should return the data from the server', async () => {
    const { result } = renderHook(() => useFetch(mockImageUrl));

    await waitFor(() => {
      expect(result.current.data).toEqual(mockImageData);
    });
  });
});
