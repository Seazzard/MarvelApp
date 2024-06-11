import Comics from '../Comics';
import '../App/App.css';

class App {
  async render() {
    await Comics.render();
  }
}

export default new App();
