import { resetScale } from './scale.js';
import { resetEffects } from './effect.js';

const form = document.querySelector('.img-upload__form');
const overlay = document.querySelector('.img-upload__overlay');
const body = document.body;
const cancelButton = document.querySelector('#upload-cancel');
const fileField = document.querySelector('#upload-file');
const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');

const MAX_HASHTAG_COUNT = 5;
const TAG_RE = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/; // # + 1..19 (итого ≤ 20)

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'pristine-error',
  errorClass: 'img-upload__field-wrapper--error',
});

const showModal = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeyDown);
};

const hideModal = () => {
  form.reset();
  resetScale();
  resetEffects();
  pristine.reset();
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeyDown);
  fileField.value = ''; // на всякий случай
};

const isTextFieldFocused = () =>
  document.activeElement === hashtagField ||
  document.activeElement === commentField;

function onEscKeyDown(evt) {
  if (evt.key === 'Escape' && !isTextFieldFocused()) {
    evt.preventDefault();
    hideModal();
  }
}

const onCancelButtonClick = () => hideModal();
const onFileInputChange = () => showModal();

const parseTags = (value) => value.trim().split(/\s+/).filter(Boolean);
const hasValidCount = (value) => parseTags(value).length <= MAX_HASHTAG_COUNT;
const eachTagValid = (value) => parseTags(value).every((t) => TAG_RE.test(t));
const uniqueTags = (value) => {
  const tags = parseTags(value).map((t) => t.toLowerCase());
  return tags.length === new Set(tags).size;
};

pristine.addValidator(hashtagField, hasValidCount, `Не более ${MAX_HASHTAG_COUNT} хэштегов`);
pristine.addValidator(hashtagField, eachTagValid, 'Хэштег должен начинаться с #, только буквы/цифры, длина 2–20');
pristine.addValidator(hashtagField, uniqueTags, 'Хэштеги не должны повторяться');

const isCommentLengthOk = (value) => value.length <= 140;
pristine.addValidator(commentField, isCommentLengthOk, 'Комментарий не может быть длиннее 140 символов');

const stopEsc = (e) => e.stopPropagation();
hashtagField.addEventListener('keydown', stopEsc);
commentField.addEventListener('keydown', stopEsc);

const onFormSubmit = (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
  // если валидно — даём форме отправиться обычным путём (по ТЗ на этом этапе)
};

fileField.addEventListener('change', onFileInputChange);
cancelButton.addEventListener('click', onCancelButtonClick);
form.addEventListener('submit', onFormSubmit);
