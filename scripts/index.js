// кнопки "редактировать" и "закрыть":

const profileEditButton = document.querySelector('.profile__edit-button')
const popupEditButton = document.querySelector('.popup_type_edit-button')
const popupClose = popupEditButton.querySelector('.popup__close')

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


// кнопка "сохранить":

let popupInputName = document.querySelector('.popup__input_type_name')
let popupInputAbout = document.querySelector('.popup__input_type_about')
let profileName = document.querySelector('.profile__name')
let profileAbout = document.querySelector('.profile__about')
let popupForm = document.querySelector('.popup__form')

function handleFormSubmit (evt) {
    evt.preventDefault(); 
    profileName.textContent = popupInputName.value
    profileAbout.textContent = popupInputAbout.value
    closePopupEdit();
}

popupForm.addEventListener('submit', handleFormSubmit); 