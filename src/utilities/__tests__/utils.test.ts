import { convertByteToMB, formatDate } from '../utils';

describe('convertByteToMB', () => {
  test('convert byte value to Megabyte', () => {
    const value = 1048576;

    const actualValue = convertByteToMB(value);
    expect(actualValue).toEqual('1.0');
  });

  test('convert byte value less than 1024 to Megabyte', () => {
    const value = 1000;

    const actualValue = convertByteToMB(value);
    expect(actualValue).toEqual('0.0');
  });

  test('convert byte value to fraction Megabyte', () => {
    const value = 5767168;

    const actualValue = convertByteToMB(value);
    expect(actualValue).toEqual('5.5');
  });
});

describe('formatDate', () => {
  test('format a date to a readable format', () => {
    const date = '2023-03-13T08:23:20.462Z';

    const actualDate = formatDate(date);
    expect(actualDate).toEqual('March 13, 2023');
  });
});
