import { openPopup, popupImageForm, popupImage, popupImageTitle } from './index.js'
//с этим пока не получилось, попробую разобраться в следующем спринте, а то уже сроки поджимают

export class Card {
    constructor(data, templateSelector) {
        this._name = data.name
        this._link = data.link
        this._templateSelector = templateSelector
        this._element = this._getTemplate()
        this._like = this._element.querySelector('.element__like')
        this._image = this._element.querySelector('.element__image')
        this._trash = this._element.querySelector('.element__trash')
        this._caption = this._element.querySelector('.element__caption')
    }

    _getTemplate() {
        const element = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.element')
            .cloneNode(true)
        return element
    }

    // лайк:
    _likeElement () {
        this._like.classList.toggle('element__like_active')
    }

    // удаление:
    _deleteElement () {
        this._element.remove()
    }

    //  открытие попапа изображения:
    _openPopupImage() {
        popupImage.src = this._link
        popupImageTitle.textContent = this._name
        popupImage.alt = this._name
        openPopup(popupImageForm)
    }

    generateCard() {
        this._like.addEventListener('click', () => {
            this._likeElement() 
        });
        this._trash.addEventListener('click', () => {
            this._deleteElement()
        });
        this._image.addEventListener('click', () => {
            this._openPopupImage()
        })
       
        this._caption.textContent = this._name
        this._image.src = this._link
        this._image.name = this._name

        return this._element
    };
}