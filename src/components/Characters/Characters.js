import { IMG_STANDARD_XLARGE } from '../../constants/api';
import { ROOT_MODAL } from '../../constants/root';

import { getDataApi } from '../../utils/getDataApi';
import Notification from '../Notification';
import imgCloseWhite from './img/close-white.svg';
import './Characters.module.css';

class Characters {
  renderContent(data) {
    console.log(data);
    let htmlContent = '';
    data.forEach(({ name, thumbnail: { path, extension } }) => {
      const imgSrc = path + '/' + IMG_STANDARD_XLARGE + '.' + extension;

      htmlContent += `
        <li class="characters__item">
            <img class="img__cover characters__img"  src="${imgSrc}"/>
            <span class="characters__name">${name}</span>
        </li>
      `;
    });

    const htmlWrapper = `
    <div class="wrapper">    
        <ul class="characters__container">
            ${htmlContent}    
        </ul>
        <button
        class="btn bg-contain characters__close"
        onclick="modal.innerHTML =''"
        style="background-image: url(${imgCloseWhite})">             
        </button>
    </div>
    `;

    ROOT_MODAL.innerHTML = htmlWrapper;
  }

  async render(uri) {
    const data = await getDataApi.getData(uri);

    data.length ? this.renderContent(data) : Notification.render();

    console.log(data);
  }
}

export default new Characters();
