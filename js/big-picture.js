import {isEscapeKey} from './util.js';

const COMMENTS_PORTION = 5;

const bigPictureElement = document.querySelector('.big-picture');
const closeModalButton = bigPictureElement.querySelector('.big-picture__cancel');
const commentsList = bigPictureElement.querySelector('.social__comments');
const commentCountWrap = bigPictureElement.querySelector('.social__comment-count');
const shownCountEl = bigPictureElement.querySelector('.social__comment-shown-count');
const totalCountEl = bigPictureElement.querySelector('.social__comment-total-count');
const loadMoreBtn = bigPictureElement.querySelector('.comments-loader');

let allComments = [];
let shownCount = 0;

const renderComment = (comment) => {
  const li = document.createElement('li');
  li.className = 'social__comment';

  const img = document.createElement('img');
  img.className = 'social__picture';
  img.src = comment.avatar;
  img.alt = comment.name;
  img.width = 35;
  img.height = 35;

  const p = document.createElement('p');
  p.className = 'social__text';
  p.textContent = comment.message;

  li.append(img, p);
  return li;
};

const clearComments = () => {
  while (commentsList.firstChild) {
    commentsList.removeChild(commentsList.firstChild);
  }
};

const updateCounters = () => {
  shownCountEl.textContent = String(shownCount);
  totalCountEl.textContent = String(allComments.length);
};

const renderNextPortion = () => {
  const nextEnd = Math.min(shownCount + COMMENTS_PORTION, allComments.length);
  const fragment = document.createDocumentFragment();
  for (let i = shownCount; i < nextEnd; i++) {
    fragment.appendChild(renderComment(allComments[i]));
  }
  commentsList.appendChild(fragment);
  shownCount = nextEnd;
  updateCounters();

  // Скрываем кнопку, если всё показали
  if (shownCount >= allComments.length) {
    loadMoreBtn.classList.add('hidden');
  } else {
    loadMoreBtn.classList.remove('hidden');
  }
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    // не закрываем, если печатает в инпуте
    const tag = document.activeElement?.tagName?.toLowerCase();
    if (tag === 'input' || tag === 'textarea') {
      return;
    }
    closeBigPicture();
  }
};

const onLoadMoreClick = () => renderNextPortion();

function openBigPicture() {
  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  loadMoreBtn.addEventListener('click', onLoadMoreClick);
}

function closeBigPicture() {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  loadMoreBtn.removeEventListener('click', onLoadMoreClick);
}

closeModalButton.addEventListener('click', closeBigPicture);

export const renderBigPicture = (picture) => {
  const {url, description, likes, comments} = picture;

  // Заполняем статические поля
  bigPictureElement.querySelector('.big-picture__img img').src = url;
  bigPictureElement.querySelector('.social__caption').textContent = description;
  bigPictureElement.querySelector('.likes-count').textContent = String(likes);

  // Готовим комментарии
  allComments = comments || [];
  shownCount = 0;
  clearComments();

  // Показать счётчик и кнопку (по ТЗ)
  commentCountWrap.classList.remove('hidden');
  loadMoreBtn.classList.remove('hidden');

  totalCountEl.textContent = String(allComments.length);
  shownCountEl.textContent = '0';

  // Рендерим первую порцию
  renderNextPortion();

  // Открываем модалку
  openBigPicture();
};
