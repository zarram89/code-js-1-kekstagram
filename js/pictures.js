const similarPicturesTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const createPictureElement = ({url, description, likes, comments}) => {
  const pictureElement = similarPicturesTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__img').alt = description;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;

  return pictureElement;
};

export const renderPictures = (pictures, container) => {
  const fragment = document.createDocumentFragment();

  for (const picture of pictures) {
    const pictureElement = createPictureElement(picture);
    fragment.append(pictureElement);
  }
  container.append(fragment);
};
