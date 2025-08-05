const SIMILAR_PICTURE_COUNT = 25;
const LIKES_COUNT = {
  MIN: 15, MAX: 200,
};
const COMMENTS_COUNT = {
  MIN: 0, MAX: 30,
};
const MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',];
const NAMES = [
  'Иван',
  'Николай',
  'Петр',
  'Рома',
  'Вася',
  'Маша',
  'Вика',
  'Поля',
  'Даша'
];
const DESCRIPTIONS = [
  'Закат над горами — настоящее волшебство.',
  'Дорога, уводящая в никуда.',
  'Уютный вечер на берегу моря.',
  'Город, просыпающийся вместе с солнцем.',
  'Прогулка по осеннему лесу.',
  'Небо в огне — закат мечты.',
  'Тишина перед бурей.',
  'Следы на песке и шум прибоя.',
  'Заброшенное здание с историей.',
  'Вид с вершины, который стоит усилий.',
  'Мост в облаках — почти как сказка.',
  'Пейзаж, от которого захватывает дух.',
  'Городская суета в объективе.',
  'Рассвет, который хочется запомнить.',
  'Поле, уходящее за горизонт.',
  'Старый маяк на фоне заката.',
  'Цветочный сад в самом расцвете.',
  'Краски ночного города.',
  'Моменты у костра в тишине.',
  'Лесной ручей и пение птиц.',
  'Переулок, полный тайных историй.',
  'Панорама большого города сверху.',
  'Идеальный пикник на лужайке.',
  'Зимняя сказка в горах.',
  'Старинная улица в закатном свете.'
];

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createMessage = () => {
  const selected = new Set();
  while (selected.size < getRandomInteger(1, 2)) {
    selected.add(getRandomArrayElement(MESSAGES));
  }
  return Array.from(selected).join(' ');
};

const createCommentGenerator = () => {
  let id = 1;
  return () => ({
    id: id++,
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message: createMessage(),
    name: getRandomArrayElement(NAMES),
  });
};

const generateComment = createCommentGenerator();

const generateComments = () => Array.from({length: getRandomInteger(COMMENTS_COUNT.MIN, COMMENTS_COUNT.MAX)}, generateComment);

const createPicture = (id) => ({
  id: id + 1,
  url: `photos/${id + 1}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(LIKES_COUNT.MIN, LIKES_COUNT.MAX),
  comments: generateComments(),
});

const generateSimilarPictures = () => Array.from({length: SIMILAR_PICTURE_COUNT}, (_, id) => createPicture(id));

console.log(generateSimilarPictures());
