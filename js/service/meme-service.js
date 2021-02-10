'use strict'
var gImgs = [{
        id: 0,
        url: 'img/0.jpg',
        keywords: ['happy']
    },
    {
        id: 1,
        url: 'img/1.jpg',
        keywords: ['happy']
    },
    {
        id: 2,
        url: 'img/2.jpg',
        keywords: ['happy']
    },
    {
        id: 3,
        url: 'img/3.jpg',
        keywords: ['happy']
    },
    {
        id: 4,
        url: 'img/4.jpg',
        keywords: ['happy']
    },
    {
        id: 5,
        url: 'img/5.jpg',
        keywords: ['happy']
    },
    {
        id: 6,
        url: 'img/6.jpg',
        keywords: ['happy']
    },
    {
        id: 7,
        url: 'img/7.jpg',
        keywords: ['happy']
    },
    {
        id: 8,
        url: 'img/8.jpg',
        keywords: ['happy']
    },
    {
        id: 9,
        url: 'img/9.jpg',
        keywords: ['happy']
    },
    {
        id: 10,
        url: 'img/10.jpg',
        keywords: ['happy']
    },
    {
        id: 11,
        url: 'img/11.jpg',
        keywords: ['happy']
    },
];
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
        color: 'red',
        strokeColor: 'black'
    }, {
        txt: 'This is my Second line',
        size: 20,
        align: 'left',
        color: 'red',
        strokeColor: 'black'
    }]
}

function initCanvas() {
    gElCanvas = document.getElementById('img-canvas')
    gCtx = gElCanvas.getContext('2d')
    renderCanvas()
}

function renderCanvas() {
    const img = new Image()
    img.src = `./img/${gMeme.selectedImgId}.jpg`;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        //FIXME:add a for each loop on gMeme.lines to support more line rendering
        drawText(gMeme.lines[0].txt, 250, 50, gMeme.lines[0].color, gMeme.lines[0].strokeColor)
        drawText(gMeme.lines[1].txt, 250, 450, gMeme.lines[1].color, gMeme.lines[1].strokeColor)
    }
}

function drawImg() {
    gCtx.globalCompositeOperation = 'destination-over';
    const img = new Image()
    img.src = `./img/${gMeme.selectedImgId}.jpg`;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    }
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
}

function drawText(txt, x, y, fillColor, strokeColor) {
    gCtx.globalCompositeOperation = 'source-over';
    gCtx.lineWidth = 2
    gCtx.strokeStyle = strokeColor
    gCtx.fillStyle = fillColor
    gCtx.font = '40px Impact'
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle';
    gCtx.fillText(txt, x, y)
    gCtx.strokeText(txt, x, y)

}

function drawRect(x, y) {
    gCtx.beginPath()
    gCtx.rect(x, y, 450, 50)
    gCtx.fillStyle = 'transparent'
    // gCtx.fill()
    gCtx.fillRect(x, y, 450, 50)
    gCtx.strokeStyle = 'white'
    gCtx.stroke()
}

function getCurrMeme() {
    return gMeme.lines[gMeme.selectedLineIdx]
}