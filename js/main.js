import {renderPictures} from './pictures.js';
import {generateSimilarPictures} from './data.js';
import './form.js';

const picturesContainer = document.querySelector('.pictures');
renderPictures(generateSimilarPictures(), picturesContainer);

