export class FormValidator {
  constructor(form, config) {
    this._form = form
    this._formSelector = config.formSelector
    this._inputSelector = config.inputSelector
    this._submitButtonSelector = config.submitButtonSelector
    this._disabledButtonClass = config.disabledButtonClass
    this._inputErrorClass = config.inputErrorClass
    this._errorClass = config.errorClass
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector))
    this._addButton = this._form.querySelector(this._submitButtonSelector)
  }
  
  // показать ошибку:
  _showInputError(input) {
    input.classList.add(this._inputErrorClass)
    const span = this._form.querySelector(`.${input.id}-error`)
    span.textContent = input.validationMessage
    span.classList.add(this._errorClass)
  }
  
  // спрятать ошибку:
  _hideInputError(input) {
    input.classList.remove(this._inputErrorClass)
    const span = this._form.querySelector(`.${input.id}-error`)
    span.textContent = ''
    span.classList.remove(this._errorClass)
  }

  _hasInvalidValue() {
    return this._inputList.some(input => {
      return !input.validity.valid
    })
  }

  // проверяем на валидность:
  _isValid (input) {
    if(!input.validity.valid) {
      this._showInputError(input)
    } else {
      this._hideInputError(input)
    }
  }

  // кнопка доступна/недоступна:
  _enableButton () {
    this._addButton.disabled = false
    this._addButton.classList.remove(this._disabledButtonClass)
  }

  _disableButton () {
    this._addButton.disabled = true
    this._addButton.classList.add(this._disabledButtonClass)
  }

  _toggleButtonState() {
    if(this._hasInvalidValue(this._inputList)) {
      this._disableButton(this._addButton)
    } else {
      this._enableButton(this._addButton)
    }
  }

  // находим у формы все инпуты и вешаем слушатель:
  _setEventListeners() {
    this._toggleButtonState()
    this._inputList.forEach(input => {
      input.addEventListener('input', () => {
        this._isValid(input)
        this._toggleButtonState()
      })
    })
  }

  enableValidation() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this._disableButton()
    })
    this._setEventListeners()
  }
}