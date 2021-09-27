import Header from './components/Header';
import Scrolly from './components/Scrolly';
import Form from './components/Form';
import particles from './components/particles';
import app from './components/app';

export default class ComponentFactory {
  constructor() {
    this.componentInstances = [];
    this.componentList = {
      Header,
      Scrolly,
      Form,
      particles,
      app,
    };
    this.init();
  }

  init() {
    const components = document.querySelectorAll('[data-component]');

    for (let i = 0; i < components.length; i++) {
      const element = components[i];
      const componentName = element.dataset.component;

      if (this.componentList[componentName]) {
        const instance = new this.componentList[componentName](element);
        this.componentInstances.push(instance);
      } else {
        console.log(`La composante ${componentName} n'existe pas`);
      }
    }
  }
}
