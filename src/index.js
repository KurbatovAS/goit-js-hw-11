'use strict';

import './css/styles.css';
import './css/normalize.css';
import axios from 'axios';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { refs } from './js/refs';
// import { fetchArticles } from './js/fetchArticles';
import { resetMarkup, createCardMarkup } from './js/markup';
import { noFoundMessage, noMoreImagesMessage, totalHintsMessage } from './js/messages';
import { resetPageCount, pageCountIncrement } from './js/fetchPageActions';

refs.loadMoreBtnEl.hidden = true;
let pageCount = 1;
let searchValue = '';
let imagesCounter = 0;

refs.formEl.addEventListener('submit', onSubmit);

function onSubmit(event) {
    event.preventDefault();
    imagesCounterReset();
    refs.loadMoreBtnEl.hidden = true;
    resetMarkup()
    pageCount = resetPageCount(pageCount);
    searchValue = event.target[0].value.trim();    
    getImages();
    // const modal = new SimpleLightbox('.gallery a');
};

refs.loadMoreBtnEl.addEventListener('click', onLoadMoreBtn);
refs.galleryEl.addEventListener('click', onImageClick);

function onImageClick(event) {
    console.log(event.target)
}

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
            modal.refresh();
            // var gallery = $('.gallery a').simpleLightbox();
            // gallery.refresh();
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
    console.log('imagesCounter before reset', imagesCounter)
    imagesCounter = 0;
    console.log('imagesCounter after reset', imagesCounter)
};

function imagesCounterIct(foundImagesArray) {
    console.log('imagesCounter before increment', imagesCounter)
    // if (imagesCounter !== 0) {
    //     return;
    // }
    imagesCounter += foundImagesArray;
    console.log('imagesCounter after increment', imagesCounter)
}

function noMoreImages(imagesFound) {
    console.log('imagesCounter in noMoreImages()', imagesCounter)
    console.log('imagesFound in noMoreImages()', imagesFound)
    if (imagesCounter === imagesFound) {
        noMoreImagesMessage();
        refs.loadMoreBtnEl.hidden = true;
    }
};

const modal = new SimpleLightbox('.gallery a', { captions: true, captionsData: 'alt', captionDelay: 250 });

