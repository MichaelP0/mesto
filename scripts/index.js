import { Card } from './Card.js'
import { FormValidator } from './FormValidator.js'
import { initialCards } from './constants.js'

const profileEditButton = document.querySelector('.profile__edit-button')
const popupEdit = document.querySelector('.popup_type_edit')
const closePopupButtons = document.querySelectorAll('.popup__close')
const popupInputName = document.querySelector('.popup__input_type_name')
const popupInputAbout = document.querySelector('.popup__input_type_about')
const profileName = document.querySelector('.profile__name')
const profileAbout = document.querySelector('.profile__about')
const popupAddForm = document.querySelector('.popup__form_add')
const popupEditForm = document.querySelector('.popup__form_edit')
const elements = document.querySelector('.elements')
const profileAddButton = document.querySelector('.profile__add-button')
const popupAdd = document.querySelector('.popup_type_add')
const popupImage = document.querySelector('.popup-container-image__open-image')
const popupImageTitle = document.querySelector('.popup-container-image__caption') 
const popupImageForm = document.querySelector('.popup_type_image') 
const popupInputTitle = document.querySelector('.popup__input_type_title')
const popupInputUrl = document.querySelector('.popup__input_type_link')
const allPopups = document.querySelectorAll('.popup')
const popupForm = document.querySelectorAll('.popup__form')
const element = document.querySelector('.elements__template').content
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    disabledButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_visible'
}

// открытие и закрытие попапов:
function openPopup (popup) {
    popup.classList.add('popup_opened')
    document.addEventListener('keydown', closePressEsc)
}

function closePopup (popup) {
    popup.classList.remove('popup_opened')
    document.removeEventListener('keydown', closePressEsc)
}

closePopupButtons.forEach((button) => { 
    const popupClose = button.closest('.popup')
    button.addEventListener('click', () => closePopup(popupClose))
})

// закрытие попапа кнопкой ESC:
function closePressEsc(evt) {
    if (evt.key === 'Escape') {
        const popupOpened = document.querySelector('.popup_opened')
        closePopup(popupOpened)
    }
}

// кнопка "сохранить" и закрыть в форме редактирования:
function handleSubmitEdit (evt) {
    evt.preventDefault()
    profileName.textContent = popupInputName.value
    profileAbout.textContent = popupInputAbout.value
    closePopup(popupEdit)
}

// сохранение данных в форме добавления карточки:
function handleSubmitAdd (evt) {
    evt.preventDefault()
    const item = {}
    item.name = popupInputTitle.value
    item.link = popupInputUrl.value
    const card = new Card(item, '.elements__template')
    const cardElement = card.generateCard()
    elements.prepend(cardElement)
    closePopup(popupAdd)
    evt.target.reset()
}

// закрытие попапа кликом на оверлей:
function handlePopupOverlay(evt) {
    const overlay = evt.target
    const popupAround = overlay.classList.contains('popup')
    if (popupAround) {
        closePopup(overlay)
    }
}

// слушатели:
allPopups.forEach((popup) => {
    popup.addEventListener('click', handlePopupOverlay)
})
profileEditButton.addEventListener('click', () => {openPopup(popupEdit)})
popupEditForm.addEventListener('submit', handleSubmitEdit)
profileAddButton.addEventListener('click', () => {
    openPopup(popupAdd)
})
popupAddForm.addEventListener('submit', handleSubmitAdd)
popupImage.addEventListener('click', openPopup)


const renderInitialCards = () => {
    initialCards.forEach((item) => {
        const card = new Card(item, '.elements__template')
        const cardElement = card.generateCard()
        elements.append(cardElement)
    })
}

popupForm.forEach((form) => {
    const formValidation = new FormValidator(form, validationConfig)
    formValidation.enableValidation()
})

renderInitialCards()
   
export { openPopup, popupImageForm, popupImage, popupImageTitle }