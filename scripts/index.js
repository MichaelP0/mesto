const profileEditButton = document.querySelector('.profile__edit-button')
const popupEditButton = document.querySelector('.popup_type_edit-button')
const popupClose = popupEditButton.querySelector('.popup__close')
const popupInputName = document.querySelector('.popup__input_type_name')
const popupInputAbout = document.querySelector('.popup__input_type_about')
const profileName = document.querySelector('.profile__name')
const profileAbout = document.querySelector('.profile__about')
const popupForm = document.querySelector('.popup__form')
const popupAddForm = document.querySelector('.popup__form_add')
const popupEditForm = document.querySelector('.popup__form_edit')
const profileAddButton = document.querySelector('.profile__add-button')
const popupAddButton = document.querySelector('.popup_type_add-button')
const popupCloseAdd = popupAddButton.querySelector('.popup__close')
const element = document.querySelector('.elements__template').content
const elements = document.querySelector('.elements')
const popupImage = document.querySelector('.popup__image_open')
const popupImageTitle = document.querySelector('.popup__image-caption_open') 
const popupImageForm = document.querySelector('.popup_type_image') 
const popupInputTitle = document.querySelector('.popup__input_type_title')
const popupInputUrl = document.querySelector('.popup__input_type_link')
const popupCloseImage = document.querySelector('.popup__close-image')


// массив с карточками

const initialCards = [
{
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
},
{
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
},
{
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
},
{
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
},
{
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
},
{
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
}
]; 

// карточки

function createElement(name, link) {

    const itemElement = element.querySelector('.element').cloneNode(true)
    const elementName = itemElement.querySelector('.element__caption')
    const elementImage = itemElement.querySelector('.element__image')
    const deleteButton = itemElement.querySelector('.element__trash')

    elementName.textContent = name
    elementImage.src = link
    elementImage.alt = name

    // лайк
    itemElement.querySelector('.element__like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like_active')
    })

    // удаление
    deleteButton.addEventListener('click', () => itemElement.remove())

    // открытие попап картинки
    elementImage.addEventListener('click', () => {
        popupOpenImage(name, link)
      })

    return itemElement
}

function renderCards() {
    initialCards.forEach(function(card) {
      const cardElement = createElement(card.name, card.link)
      elements.appendChild(cardElement)
    });
  }


// кнопки "редактировать" и "закрыть" в профайле:

function openPopupEdit() {
    popupEditButton.classList.add('popup_opened')
    popupInputName.value = profileName.textContent
    popupInputAbout.value = profileAbout.textContent
}

function closePopupEdit() {
    popupEditButton.classList.remove('popup_opened')
}

profileEditButton.addEventListener('click', openPopupEdit)
popupClose.addEventListener('click', closePopupEdit)

// кнопки "добавить" и "закрыть" в профайле:

function openPopupAdd() {
    popupAddButton.classList.add('popup_opened')
}

function closePopupAdd() {
    popupAddButton.classList.remove('popup_opened')
}

profileAddButton.addEventListener('click', openPopupAdd)
popupCloseAdd.addEventListener('click', closePopupAdd)

// кнопка "сохранить" на попапе в профайле:

function handleSubmitEdit (evt) {
    evt.preventDefault()
    profileName.textContent = popupInputName.value
    profileAbout.textContent = popupInputAbout.value
    closePopupEdit(popupEditForm)
}

popupEditForm.addEventListener('submit', handleSubmitEdit)

function handleSubmitAdd (evt) {
    evt.preventDefault()
    const newCardElement = createElement(popupInputTitle.value, popupInputUrl.value)
    elements.prepend(newCardElement)
    closePopupAdd(popupAddForm)
    popupAddForm.reset()
}

popupAddForm.addEventListener('submit', handleSubmitAdd)

//  Открытие попапа изображения

function popupOpenImage(name, link) {
    popupImage.src = link
    popupImageTitle.textContent = name
    popupImage.alt = `Увеличенная фотография - ${name}`
    openPopupImage(popupImageForm)
}

function openPopupImage() {
    popupImageForm.classList.add('popup_opened')
}

function closePopupImage() {
    popupImageForm.classList.remove('popup_opened')
}

popupImage.addEventListener('click', openPopupImage)
popupCloseImage.addEventListener('click', closePopupImage)

renderCards();