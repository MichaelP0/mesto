const profileEditButton = document.querySelector('.profile__edit-button')
const popupEdit = document.querySelector('.popup_type_edit')
const closePopupButtons = document.querySelectorAll('.popup__close')
const popupInputName = document.querySelector('.popup__input_type_name')
const popupInputAbout = document.querySelector('.popup__input_type_about')
const profileName = document.querySelector('.profile__name')
const profileAbout = document.querySelector('.profile__about')
const popupAddForm = document.querySelector('.popup__form_add')
const popupEditForm = document.querySelector('.popup__form_edit')
const profileAddButton = document.querySelector('.profile__add-button')
const popupAdd = document.querySelector('.popup_type_add')
const element = document.querySelector('.elements__template').content
const elements = document.querySelector('.elements')
const popupImage = document.querySelector('.popup-container-image__open-image')
const popupImageTitle = document.querySelector('.popup-container-image__caption') 
const popupImageForm = document.querySelector('.popup_type_image') 
const popupInputTitle = document.querySelector('.popup__input_type_title')
const popupInputUrl = document.querySelector('.popup__input_type_link')
const popupCloseImage = document.querySelector('.popup-container-image__close-image')
const allPopups = document.querySelectorAll('.popup')
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    disabledButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_visible'
}

// карточки:
function createElement(name, link) {
    const itemElement = element.querySelector('.element').cloneNode(true)
    const elementName = itemElement.querySelector('.element__caption')
    const elementImage = itemElement.querySelector('.element__image')
    const deleteButton = itemElement.querySelector('.element__trash')

    elementName.textContent = name
    elementImage.src = link
    elementImage.alt = name

    // лайк:
    itemElement.querySelector('.element__like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like_active')
    })

    // удаление:
    deleteButton.addEventListener('click', () => itemElement.remove())

    // открытие попап картинки:
    elementImage.addEventListener('click', () => {
        openPopupImage(name, link)
    })

    return itemElement
}

function renderInitialCards() {
    initialCards.forEach(function(card) {
        const cardElement = createElement(card.name, card.link)
        elements.appendChild(cardElement)
    })
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

// открытие и внесение данных в форме редактирования:
function handleOpenEdit () {
    nameInput.value = infoName.textContent
    descriptionInput.value = infoDescription.textContent
    openPopup(popupEdit)
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
    const newCard = createElement(popupInputTitle.value, popupInputUrl.value)
    elements.prepend(newCard)
    closePopup(popupAdd)
    popupAddForm.reset()
}

//  открытие попапа изображения:
function openPopupImage(name, link) {
    popupImage.src = link
    popupImageTitle.textContent = name
    popupImage.alt = `Увеличенная фотография - ${name}`
    openPopup(popupImageForm)
}

// закрытие попапа кликом на оверлей:
function handlePopupOverlay(evt) {
    const overlay = evt.target
    const popupAround = overlay.classList.contains('popup')
    if (popupAround) {
        closePopup(overlay)
    }
}

allPopups.forEach((popup) => {
    popup.addEventListener('click', handlePopupOverlay)
})

// слушатели:
profileEditButton.addEventListener('click', () => {openPopup(popupEdit)})
popupEditForm.addEventListener('submit', handleSubmitEdit)
profileAddButton.addEventListener('click', () => {
    openPopup(popupAdd)
})
popupAddForm.addEventListener('submit', handleSubmitAdd)
popupImage.addEventListener('click', openPopup)

renderInitialCards()
enableValidation(validationConfig)