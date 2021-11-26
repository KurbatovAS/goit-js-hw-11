import Notiflix from 'notiflix';

function noFoundMessage() {
    Notiflix.Notify.warning('Sorry, there are no images matching your search query. Please try again.');
}

function noMoreImagesMessage() {
    Notiflix.Notify.warning(`We're sorry, but you've reached the end of search results.`);
}

function totalHintsMessage(totalHits) {
    Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
}

export { noFoundMessage, noMoreImagesMessage, totalHintsMessage };