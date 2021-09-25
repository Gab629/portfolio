/** Composante Header de Timtools */
export default class Header {
  /**
   * method constructor
   * @param {HTMLElement} element - Élément HTML sur lequel la composante est instancié
   */
  constructor(element) {
    this.element = element;
    this.scrollLimit = 0.1;
    this.scrollPosition = 0;
    this.lastScrollPosition = 0;
    this.html = document.documentElement;

    this.init();
    this.initNavMobile();
  }

  /**
   * Méthode d'initialisation
   */

  init() {
    window.addEventListener('scroll', this.onScroll.bind(this));
  }

  /**
   * Méthode onScroll
   * On récupère la position de notre dernier scroll
   * @param {Event} event - Évenement appeler lors du scroll de la page
   */
  onScroll(event) {
    this.lastScrollPosition = this.scrollPosition;
    this.scrollPosition = document.scrollingElement.scrollTop; //Calcul la valeur du scroll
    this.setHeaderState();
    this.setDirectionState();
  }

  /**
   * Méthode setHeaderState
   * Sert à cacher le header si on scroll vers le haut et à le montrer si on scroll vers le bas
   */
  setHeaderState() {
    const scrollHeight = document.scrollingElement.scrollHeight;

    if (this.scrollPosition > scrollHeight * this.scrollLimit) {
      this.html.classList.add('header-is-hidden');
    } else {
      this.html.classList.remove('header-is-hidden');
    }
  }

  /**
   * Méthode setDirectionState
   * Sert à savoir si on scroll vers le bas ou vers le haut
   */
  setDirectionState() {
    if (this.scrollPosition >= this.lastScrollPosition) {
      this.html.classList.add('is-scrolling-down');
      this.html.classList.remove('is-scrolling-up');
    } else {
      this.html.classList.remove('is-scrolling-down');
      this.html.classList.add('is-scrolling-up');
    }
  }

  /**
   * Méthode initNavMobile
   * Lorsqu'on click sur le bouton du menu mobile on appelle la méthode onToggleNav
   */
  initNavMobile() {
    const toggle = this.element.querySelector('.js-toggle');
    toggle.addEventListener('click', this.onToggleNav.bind(this));
  }

  /**
   * Méthode onToggleNav
   * On met le menu modal actif ce qui va ouvrir le nav
   */
  onToggleNav() {
    this.html.classList.toggle('nav-is-active');
  }
}
