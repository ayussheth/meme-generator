'use strict'
var gImgs = [{
        id: 0,
        url: 'img/0.jpg',
        keywords: ['shrek', 'confused', 'sarcastic']
    },
    {
        id: 1,
        url: 'img/1.jpg',
        keywords: ['shrek', 'sarcastic']
    },
    {
        id: 2,
        url: 'img/2.jpg',
        keywords: ['shrek', 'monsters inc', 'awkward']
    },
    {
        id: 3,
        url: 'img/3.jpg',
        keywords: ['shrek', 'trump', 'angry', 'funny']
    },
    {
        id: 4,
        url: 'img/4.jpg',
        keywords: ['shrek', 'sarcastic']
    },
    {
        id: 5,
        url: 'img/5.jpg',
        keywords: ['shrek', 'jacuzzi', 'funny']
    },
    {
        id: 6,
        url: 'img/6.jpg',
        keywords: ['shrek']
    },
    {
        id: 7,
        url: 'img/7.jpg',
        keywords: ['shrek', 'funny','awkward']
    },
    {
        id: 8,
        url: 'img/8.jpg',
        keywords: ['shrek','angry']
    },
    {
        id: 9,
        url: 'img/9.jpg',
        keywords: ['shrek','real-life','funny','awkward']
    },
    {
        id: 10,
        url: 'img/10.jpg',
        keywords: ['shrek','donkey','awkward']
    },
    {
        id: 11,
        url: 'img/11.jpg',
        keywords: ['shrek','shrexy','smile','awkward']
    },
    {
        id: 12,
        url: 'img/12.jpg',
        keywords: ['shrek','donkey','awkward','smile']
    },
    {
        id: 13,
        url: 'img/13.jpg',
        keywords: ['shrek']
    },
    {
        id: 14,
        url: 'img/14.jpg',
        keywords: ['shrek']
    },
    {
        id: 15,
        url: 'img/15.jpg',
        keywords: ['shrek']
    },
    {
        id: 16,
        url: 'img/16.jpg',
        keywords: ['shrek']
    },
    {
        id: 17,
        url: 'img/17.jpg',
        keywords: ['shrek']
    },
];
var gSavedMemes;
var gElCanvas;
var gCtx;
var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    exportReady: false,
    lines: [{
        txt: 'This is my First line',
        pos: {
            x: 250,
            y: 50
        },
        size: 40,
        align: 'center',
        color: 'red',
        strokeColor: 'black',
        width: 312,
        isDragging:false,
        font:'Impact'
    }, {
        txt: 'This is my Second line',
        pos: {
            x: 250,
            y: 450
        },
        size: 40,
        align: 'center',
        color: 'red',
        strokeColor: 'black',
        width: 362,
        isDragging:false,
        font:'Impact'
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
            saveRectToLine(line)
            line.width=parseInt(gCtx.measureText(`${line.txt}`).width)
            if (gMeme.lines.length && !gMeme.exportReady) drawRect(gMeme.lines[gMeme.selectedLineIdx].pos.x - (gMeme.lines[gMeme.selectedLineIdx].width / 2), gMeme.lines[gMeme.selectedLineIdx].pos.y - (gMeme.lines[gMeme.selectedLineIdx].size / 2), gMeme.lines[gMeme.selectedLineIdx].width, gMeme.lines[gMeme.selectedLineIdx].size)
        });
        
    }
}



function drawText(id) {
    let currLine = getCurrLine(id)
    gCtx.globalCompositeOperation = 'source-over';
    gCtx.lineWidth = 2
    gCtx.strokeStyle = currLine.strokeColor
    gCtx.fillStyle = currLine.color
    gCtx.font = `${currLine.size}px ${currLine.font}`
    gCtx.textAlign = `${currLine.align}`
    gCtx.textBaseline = 'middle';
    gCtx.fillText(currLine.txt, currLine.pos.x, currLine.pos.y)
    gCtx.strokeText(currLine.txt, currLine.pos.x, currLine.pos.y)

}

function drawRect(x, y, width, height) {
    gCtx.beginPath()
    gCtx.rect(x, y, width, height)
    gCtx.fillStyle = 'transparent'
    gCtx.strokeStyle = 'white'
    if (x === gMeme.lines[gMeme.selectedLineIdx].pos.x - (gMeme.lines[gMeme.selectedLineIdx].width / 2) && y === gMeme.lines[gMeme.selectedLineIdx].pos.y - (gMeme.lines[gMeme.selectedLineIdx].size / 2)) {
        gCtx.fillRect(x, y, width, height)
        gCtx.stroke()
    }
}

function saveRectToLine(line) {
    gCtx.beginPath()
    gCtx.rect(line.pos.x-(line.width/2), line.pos.y-(line.size/2), line.width, line.size)
    line.rect = {
        xStart: line.pos.x-(line.width/2),
        yStart: line.pos.y-(line.size/2),
        xEnd: line.width,
        yEnd: line.pos.y-(line.size/2)+line.size
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

function newMemeLine() {
    gMeme.lines.push({
        txt: 'This is my new line',
        pos: {
            x: 250,
            y: 250
        },
        size: 40,
        align: 'center',
        color: 'white',
        strokeColor: 'black',
        width: parseInt(gCtx.measureText('This is my new line').width),
        isDragging: false,
        font: 'Impact'
    })
    if (gMeme.lines.length === 1) gMeme.lines[0].pos.y = 50
    else if (gMeme.lines.length === 2) gMeme.lines[1].pos.y = 450

}

function removeSelectedLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
}


function clearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
    gMeme.lines.splice(2, gMeme.lines.length)
    gMeme.lines[0].txt = 'This is my First line'
    gMeme.lines[1].txt = 'This is my Second line'
}

function clearMeme() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
    gMeme.lines.forEach((line) => {
        line.txt = ``
    });
}
function clearMemeRects() { 
    gMeme.lines.forEach((line) => {
        line.rect={}
    });

}
function resetMeme() { 
    gMeme.lines.forEach(line => {
        line.strokeColor='black'
        line.color='white'
        line.size=40
        line.align= 'center'
    });
    gMeme.lines[0].width = 312
    gMeme.lines[0].pos.x = 250
    gMeme.lines[0].pos.y = 50
    gMeme.lines[1].width = 362
    gMeme.lines[1].pos.x = 250
    gMeme.lines[1].pos.y = 450
}

function getCurrLine(id) {
    return gMeme.lines[id]
}