'use strict'
function init() { 
    initCanvas();
    renderGallery();
}
function renderGallery() { 
let elGallery = document.querySelector('.gallery-grid')
let strHTML = ``
gImgs.forEach(img => {
    strHTML+= `<div class="card"><img class="img-card" onclick="onImgPick(${img.id})" src="img/${img.id}.jpg"></div>`
});
elGallery.innerHTML = strHTML
}

function onImgPick(id) { 
    console.log(`the selected picture: ${id}`);
    console.log(gImgs[id]);
    gMeme.selectedImgId = id
    renderEditor(id)
}
function renderEditor(id) { 
    let elMainContainer = document.querySelector('.main-container');
    let elEditorContainer = document.querySelector('.editor-container')
    elMainContainer.classList.add('editor-shown')
    elEditorContainer.classList.add('shown')
    clearCanvas()
    initCanvas()
}