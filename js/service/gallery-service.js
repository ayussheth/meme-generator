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