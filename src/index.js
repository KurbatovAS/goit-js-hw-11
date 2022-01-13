'use strict';

import './css/styles.css';
import './css/normalize.css';
import axios from 'axios';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { refs } from './js/refs';
import { resetMarkup, createCardMarkup } from './js/markup';
import { onRenderPagination } from './js/pagination';
import { noFoundMessage, noMoreImagesMessage, totalHintsMessage } from './js/messages';
import { resetPageCount, pageCountIncrement } from './js/fetchPageActions';

let pageCount = 1;
let searchValue = '';
let imagesCounter = 0;

refs.loadMoreBtnEl.hidden = true;

refs.formEl.addEventListener('submit', onSubmit);
refs.loadMoreBtnEl.addEventListener('click', onLoadMoreBtn);

getImages();

function onSubmit(event) {
    event.preventDefault();
    imagesCounterReset();
    refs.loadMoreBtnEl.hidden = true;
    resetMarkup()
    pageCount = resetPageCount(pageCount);
    searchValue = event.target[0].value.trim();    
    getImages();    
};

function onLoadMoreBtn(event) {
    pageCount = pageCountIncrement(pageCount);
    getImages();
};


async function getImages() {
    const axiosOptions = {
        method: 'get',
        url:'https://pixabay.com/api/',
        params: {            
            key: '24488869-ab3c2489f9260f0be3e523737',
            q: searchValue,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            page: pageCount,
            per_page: 40,
        },
    };

    try {
        const response = await axios(axiosOptions)        
        const imagesArray = response.data;
        const foundImagesArray = response.data.hits.length;
        const imagesFound = response.data.totalHits;

        if (foundImagesArray === 0) {
            noFoundMessage();
            refs.loadMoreBtnEl.hidden = true;
        } else {
            createCardMarkup(imagesArray);
            onRenderPagination(imagesFound, pageCount)
            modal.refresh();
            refs.loadMoreBtnEl.hidden = false;
            imagesCounterIct(foundImagesArray);
            noMoreImages(imagesFound)            
            console.log('response', response);

            if (pageCount === 1) {
                totalHintsMessage(imagesFound);
            }
        }
    }
    catch (error) {
        console.error(error);
    }        
}

function imagesCounterReset() {    
    imagesCounter = 0;    
};

function imagesCounterIct(foundImagesArray) {
    imagesCounter += foundImagesArray;    
}

function noMoreImages(imagesFound) {
    if (imagesCounter === imagesFound) {
        noMoreImagesMessage();
        refs.loadMoreBtnEl.hidden = true;
    }
};

const modal = new SimpleLightbox('.gallery a', { captions: true, captionsData: 'alt', captionDelay: 250 });

export { pageCount, searchValue, getImages };

