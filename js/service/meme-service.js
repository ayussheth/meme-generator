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
        pos: {
            x: 250,
            y: 50
        },
        size: 40,
        align: 'left',
        color: 'red',
        strokeColor: 'black'
    }, {
        txt: 'This is my Second line',
        pos: {
            x: 250,
            y: 450
        },
        size: 40,
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
        gMeme.lines.forEach((line, idx) => {
            drawText(idx)
        });
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

function drawText(id) {
    let currLine = getCurrLine(id)
    gCtx.globalCompositeOperation = 'source-over';
    gCtx.lineWidth = 2
    gCtx.strokeStyle = currLine.strokeColor
    gCtx.fillStyle = currLine.color
    gCtx.font = `${currLine.size}px Impact`
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle';
    gCtx.fillText(currLine.txt, currLine.pos.x, currLine.pos.y)
    gCtx.strokeText(currLine.txt, currLine.pos.x, currLine.pos.y)

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

function getCurrLine(id) {
    return gMeme.lines[id]
}

function newMemeLine() {
    gMeme.lines.push({
        txt: 'This is my new line',
        pos: {
            x: 250,
            y: 250
        },
        size: 40,
        align: 'left',
        color: 'white',
        strokeColor: 'black'
    })
}