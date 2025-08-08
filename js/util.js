export const getRandomInteger = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const getRandomArrayElement = (elements) =>
  elements[getRandomInteger(0, elements.length - 1)];

export const isEscapeKey = (evt) => evt.key === 'Escape';
