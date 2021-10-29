/** Composante form de TimTools */
export default class form {
  /**
   * Méthode constructeur
   * @param {HTMLElement} element - Élément HTML sur lequel la composante est instanciée
   */
  constructor(element) {
    this.element = element;
    this.formElements = this.element.elements;
    this.init();
  }

  /**
   * Méthode d'initialisation
   */
  init() {
    this.element.setAttribute('novalidate', '');

    for (let i = 0; i < this.formElements.length; i++) {
      const input = this.formElements[i];

      if (input.required) {
        input.addEventListener('input', this.validateInput.bind(this));
      }
    }

    this.element.addEventListener('submit', this.onSubmit.bind(this));
  }

  onSubmit(event) {
    event.preventDefault();

    if (this.validate()) {
      console.log('succes');
      // envoie ajax du formulaire

      this.showConfirmation();
    } else {
      console.log('error');
    }

    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'message.php', true);
    xhr.onload = () => {
      if (xhr.readyState == 4 && xhr.status == 200) {
        let response = xhr.response;
        if (
          response.indexOf('required') != -1 ||
          response.indexOf('valid') != -1 ||
          response.indexOf('failed') != -1
        ) {
          statusTxt.style.color = 'red';
        } else {
          form.reset();
          setTimeout(() => {
            statusTxt.style.display = 'none';
          }, 3000);
        }
        statusTxt.innerText = response;
        form.classList.remove('disabled');
      }
    };
    let formData = new FormData(form);
    xhr.send(formData);
  }

  /**
   * Méthode description
   * @return {boolean} status de la validation
   */
  validate() {
    let isValid = true;
    for (let i = 0; i < this.formElements.length; i++) {
      const input = this.formElements[i];

      if (input.required && !this.validateInput(input)) {
        isValid = false;
      }
    }

    return isValid;
  }

  validateInput(event) {
    const input = event.currentTarget || event;

    if (input.validity.valid) {
      this.removeError(input);
    } else {
      this.addError(input);
    }

    return input.validity.valid;
  }

  addError(input) {
    const container =
      input.closest('[data-input-container]') || input.closest('.input');
    container.classList.add('error');
  }

  removeError(input) {
    const container =
      input.closest('[data-input-container]') || input.closest('.input');
    container.classList.remove('error');
  }

  showConfirmation() {
    this.element.classList.add('is-sent');
  }
}
