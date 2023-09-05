import { openPopup, popupImageForm, popupImage, popupImageTitle } from './index.js'

export class Card {
    constructor(data, templateSelector) {
        this._name = data.name
        this._link = data.link
        this._templateSelector = templateSelector
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
        this._element.querySelector('.element__like').classList.toggle('element__like_active')
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
        this._element = this._getTemplate()
        this._image = this._element.querySelector('.element__image')

        this._element.querySelector('.element__like').addEventListener('click', () => {
            this._likeElement() 
        });
        this._element.querySelector('.element__trash').addEventListener('click', () => {
            this._deleteElement()
        });
        this._image.addEventListener('click', () => {
            this._openPopupImage()
        })
       
        this._element.querySelector('.element__caption').textContent = this._name
        this._image.src = this._link
        this._image.name = this._name

        return this._element
    };
}