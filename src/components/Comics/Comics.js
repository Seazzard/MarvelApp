import {
  API_URL,
  URL_COMICS,
  IMG_STANDARD_XLARGE,
  IMG_NOT_AVAILABLE,
  URL_CHARACTERS,
} from '../../constants/api';
import { getDataApi } from '../../utils/getDataApi';
import { ROOT_INDEX } from '../../constants/root';
import Characters from '../Characters';
import Error from '../Error';
import './Comics.module.css';

class Comics {
  renderComics(data) {
    let htmlContent = '';

    data.forEach(({ id, title, thumbnail: { path, extension } }) => {
      if (path.lastIndexOf(IMG_NOT_AVAILABLE) === -1) {
        const uri = API_URL + URL_COMICS + '/' + id + '/' + URL_CHARACTERS;
        const imgSrc = path + '/' + IMG_STANDARD_XLARGE + '.' + extension;

        htmlContent += `
            <li class="comics__item" data-uri="${uri}">
                <span class="comics__name">${title}</span>
                <img class="img__contain comics__img" src="${imgSrc}"/>
            </li>
          `;
      }
    });

    const htmlWrapper = `
    <ul class="comics__container">
        ${htmlContent}
    </ul>
    `;

    ROOT_INDEX.innerHTML = htmlWrapper;
  }

  async render() {
    const data = await getDataApi.getData(API_URL + URL_COMICS);
    data ? this.renderComics(data) : Error.render();
  }
  eventListener() {
    document.querySelectorAll('.comics__item').forEach((element) => {
      const uri = element.getAttribute('data-uri');
      element.addEventListener('click', () => {
        Characters.render(uri);
      });
    });
  }
}

export default new Comics();
