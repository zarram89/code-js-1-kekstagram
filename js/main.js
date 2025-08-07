import {renderPictures} from './pictures.js';
import {generateSimilarPictures} from './data.js';

const picturesContainer = document.querySelector('.pictures');
renderPictures(generateSimilarPictures(), picturesContainer);

