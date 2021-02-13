'use strict'

const gTouchEvs = ['touchstart', 'touchmove', 'touchend']
var savedGalleryActive = false;

function init() {
    initCanvas();
    addMouseListeners();
    addTouchListeners();
    renderGallery();
    let savedGalleryMemes = loadFromStorage('SavedMemes')
    if (!savedGalleryMemes) initSavedMemes();

}

function renderGallery() {
    let elGallery = document.querySelector('.gallery-grid')
    let strHTML = ``
    gImgs.forEach(img => {
        strHTML += `<div class="card"><img class="img-card" onclick="onImgPick(${img.id})" src="img/${img.id}.jpg"></div>`
    });
    elGallery.innerHTML = strHTML
}

function renderSavedGallery() {
onCloseEditor() 
    gGalleryMemes = loadFromStorage('SavedMemes')
    let elGallery = document.querySelector('.gallery-grid')
    let strHTML = ``
    gGalleryMemes.forEach((img, idx) => {
        strHTML += `<div class="card"><img class="img-card" onclick="onSavedMemePick(${idx})" src="${img.img}"></div>`
    });
    elGallery.innerHTML = strHTML
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove);
    gElCanvas.addEventListener('mousedown', onDown);
    gElCanvas.addEventListener('mouseup', onUp);
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove);
    gElCanvas.addEventListener('touchstart', onDown);
    gElCanvas.addEventListener('touchend', onUp);
}