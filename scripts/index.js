// кнопки "редактировать" и "закрыть":

const profileEditButton = document.querySelector('.profile__edit-button')
const popupTypeEditButton = document.querySelector('.popup_type_edit-button')
const popupClose = popupTypeEditButton.querySelector('.popup__close')

function togglePopup() {
    popupTypeEditButton.classList.toggle('popup_opened')
}

profileEditButton.addEventListener('click', togglePopup)
popupClose.addEventListener('click', togglePopup)


// кнопка "сохранить":

let popupSubmit = document.querySelector('.popup__submit')
let popupInputName = document.querySelector('.popup__input_name')
let popupInputAbout = document.querySelector('.popup__input_about')
let profileName = document.querySelector('.profile__name')
let profileAbout = document.querySelector('.profile__about')

function handleFormSubmit (evt) {
    evt.preventDefault(); 
    profileName.textContent = popupInputName.value;
    profileAbout.textContent = popupInputAbout.value;
}

popupSubmit.addEventListener('click', handleFormSubmit);
popupSubmit.addEventListener('click', togglePopup); 