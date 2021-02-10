'use strict'
var gSavedMemes;
var gElCanvas;
var gCtx;
var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [{
        txt: 'This is my First line',
        size: 20,
        align: 'left',
        color: 'red'
    },{
        txt: 'This is my Second line',
        size: 20,
        align: 'left',
        color: 'red'
    }]
}


function init() {
    gElCanvas = document.getElementById('img-canvas')
    gCtx = gElCanvas.getContext('2d')
    drawText(gMeme.lines[gMeme.selectedLineIdx].txt, 250, 50)
    drawImg(gMeme.selectedImgId)
}

function drawImg() {
    gCtx.globalCompositeOperation='destination-over';
    const img = new Image()
    img.src = `./img/${gMeme.selectedImgId}.jpg`;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    }
}
function drawText(text, x, y) {
    gCtx.globalCompositeOperation='source-over';

    gCtx.lineWidth = 2
    
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = 'white'
    gCtx.font = '40px Impact'
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle';
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)

}
function onAddLine() { 
    let newLineInput = document.querySelector('.second-line-input').value
    drawText(newLineInput, 250, 450)
    
}
