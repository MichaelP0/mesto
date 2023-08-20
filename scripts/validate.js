// показать ошибку:
function showInputError(form, input, config) {
  input.classList.add(config.inputErrorClass)
  const span = form.querySelector(`.${input.id}-error`)
  span.textContent = input.validationMessage
  span.classList.add(config.errorClass)
}

// спрятать ошибку:
function hideInputError(form, input, config) {
  input.classList.remove(config.inputErrorClass)
  const span = form.querySelector(`.${input.id}-error`)
  span.textContent = ''
  span.classList.remove(config.errorClass)
}

function isValid(form, input, config) {
  if(!input.validity.valid) {
    showInputError(form, input, config)
  } else {
    hideInputError(form, input, config)
  }
}

function hasInvalidValue(inputs) {
  return inputs.some(input => !input.validity.valid) //
}

// кнопка доступна/недоступна:
const enableButton = (button, config) => {
  button.removeAttribute('disabled')
  button.classList.remove(config.disabledButtonClass)
}

const disableButton = (button, config) => {
  button.setAttribute('disabled', true)
  button.classList.add(config.disabledButtonClass)
}

function toggleButtonState(inputs, button, config) {
  if(hasInvalidValue(inputs)) {
    disableButton(button, config)
  } else {
    enableButton(button, config)
  }
}

// находим у формы все инпуты и вешаем слушатель
function setEventListeners(form, config) {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector))
  const button = form.querySelector(config.submitButtonSelector)

  inputs.forEach(input => {
    input.addEventListener('input', () => {
      isValid(form, input, config)
      toggleButtonState(inputs, button, config)
    })
  })

  toggleButtonState(inputs, button, config)
}

// находим формы и для каждой устанавливаем обработчики:
function enableValidation(config) {
  const forms = Array.from(document.querySelectorAll(config.formSelector))
  forms.forEach(form => {
    setEventListeners(form, config)
  })
}