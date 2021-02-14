'use strict'

const gTouchEvs = ['touchstart', 'touchmove', 'touchend']
var savedGalleryActive = false;

function init() {
    initCanvas();
    addMouseListeners();
    addTouchListeners();
    renderGallery();
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
    let savedMemesGallery = loadFromStorage('SavedMemes')
    onCloseEditor()
    let elGallery = document.querySelector('.gallery-grid')
    let strHTML = ``
    if (!savedMemesGallery || !savedMemesGallery.length) strHTML = `<p>Looks like you haven't saved any memes! Why not start now?</p>`
    else {savedMemesGallery.forEach((img, idx) => {
        strHTML += `<div class="card"><img class="img-card" onclick="onSavedMemePick(${idx})" src="${img.img}"><span class="saved-gallery-deletebtn" onclick="onDeleteSavedMeme(${idx})
        ">X</span></div>`
    });}
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