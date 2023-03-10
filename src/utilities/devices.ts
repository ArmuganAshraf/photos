const sizes = {
  mobile: '425px',
  tablet: '768px',
  laptop: '1024px',
  desktop: '1440px',
};

export const devices = {
  mobile: `(max-width: ${sizes.mobile})`,
  tablet: `(max-width: ${sizes.tablet})`,
  laptop: `(max-width: ${sizes.laptop})`,
  desktop: `(max-width: ${sizes.desktop})`,
  largeMonitor: `(min-width: ${sizes.desktop})`,
};
