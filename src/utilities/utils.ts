export const convertByteToMB = (value: number) => {
  return (value / 1024 ** 2).toFixed(1);
};

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-us', { month: 'long', day: 'numeric', year: 'numeric' });
};
