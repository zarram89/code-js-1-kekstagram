import {getRandomArrayElement, getRandomInteger} from './util';

const pictureData = {
  COUNT: 25,
  LIKES: {MIN: 15, MAX: 200},
  COMMENTS: {MIN: 0, MAX: 30},
  AVATAR_COUNT: 6,
  MESSAGES: [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
    'Моя бабушка случайно чихнула и сделала лучше.',
    'Я уронил фотоаппарат на кота и получилось лучше.',
    'Лица у людей перекошены. Как можно было поймать такой момент?!',
  ],
  NAMES: ['Иван', 'Николай', 'Петр', 'Рома', 'Вася', 'Маша', 'Вика', 'Поля', 'Даша'],
  DESCRIPTIONS: [
    'Закат над горами — настоящее волшебство.',
    'Уютный вечер на берегу моря.',
    'Город, просыпающийся вместе с солнцем.',
    'Следы на песке и шум прибоя.',
    'Вид с вершины, который стоит усилий.',
    'Рассвет, который хочется запомнить.',
    'Цветочный сад в самом расцвете.',
    'Моменты у костра в тишине.',
    'Панорама большого города сверху.',
    'Зимняя сказка в горах.',
  ],
};

const createMessage = () => {
  const count = getRandomInteger(1, 2);
  const uniqueMessages = new Set();
  while (uniqueMessages.size < count) {
    uniqueMessages.add(getRandomArrayElement(pictureData.MESSAGES));
  }
  return Array.from(uniqueMessages).join(' ');
};

const createCommentGenerator = () => {
  let id = 1;
  return () => ({
    id: id++,
    avatar: `img/avatar-${getRandomInteger(1, pictureData.AVATAR_COUNT)}.svg`,
    message: createMessage(),
    name: getRandomArrayElement(pictureData.NAMES),
  });
};

const generateComment = createCommentGenerator();

const generateComments = () =>
  Array.from({length: getRandomInteger(pictureData.COMMENTS.MIN, pictureData.COMMENTS.MAX)}, generateComment);

const createPicture = (id) => ({
  id: id + 1,
  url: `photos/${id + 1}.jpg`,
  description: getRandomArrayElement(pictureData.DESCRIPTIONS),
  likes: getRandomInteger(pictureData.LIKES.MIN, pictureData.LIKES.MAX),
  comments: generateComments(),
});

export const generateSimilarPictures = () =>
  Array.from({length: pictureData.COUNT}, (_, id) => createPicture(id));
