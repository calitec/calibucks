export const mediaQueryMax = (maxWidth) => `
  @media (max-width: ${maxWidth}px)
`;
export const mediaQueryMin = (minWidth) => `
  @media (min-device-width: ${minWidth}px)
`;

const media = {
  desktop: mediaQueryMin(1190),
  large: mediaQueryMax(414),
  medium: mediaQueryMax(375),
  small: mediaQueryMax(320),
};

export default media;
