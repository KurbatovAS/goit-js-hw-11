import { refs } from '../js/refs';
import CardTemplate from '../templates/cardTpl.hbs';

function resetMarkup() {
    refs.galleryEl.innerHTML = '';
}

function createCardMarkup(images) {    
    const cardMarkup = CardTemplate(images.hits);    
    refs.galleryEl.insertAdjacentHTML('beforeend', cardMarkup);
}

export {resetMarkup, createCardMarkup}