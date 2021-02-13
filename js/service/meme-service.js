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
        keywords: ['shrek', 'funny', 'awkward']
    },
    {
        id: 8,
        url: 'img/8.jpg',
        keywords: ['shrek', 'angry']
    },
    {
        id: 9,
        url: 'img/9.jpg',
        keywords: ['shrek', 'real-life', 'funny', 'awkward']
    },
    {
        id: 10,
        url: 'img/10.jpg',
        keywords: ['shrek', 'donkey', 'awkward']
    },
    {
        id: 11,
        url: 'img/11.jpg',
        keywords: ['shrek', 'shrexy', 'smile', 'awkward']
    },
    {
        id: 12,
        url: 'img/12.jpg',
        keywords: ['shrek', 'donkey', 'awkward', 'smile']
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
var gGalleryMemes = [];
var gElCanvas;
var gCtx;
var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    exportReady: false,
    lines: [{
            txt: 'This is my First line',
            pos: {
                x: 125,
                y: 25
            },
            size: 25,
            align: 'center',
            color: 'red',
            strokeColor: 'black',
            width: 312,
            isDragging: false,
            font: 'Impact',
        },
        {
            txt: 'This is my Second line',
            pos: {
                x: 125,
                y: 100
            },
            size: 25,
            align: 'center',
            color: 'red',
            strokeColor: 'black',
            width: 362,
            isDragging: false,
            font: 'Impact',
        }
    ]
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
            line.width = parseInt(gCtx.measureText(`${line.txt}`).width)
            drawText(idx)
            if (gMeme.lines.length && !gMeme.exportReady) markActiveLine()
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

function markActiveLine() {
    let currLine = getSelectedLine()

    currLine.width = parseInt(gCtx.measureText(`${currLine.txt}`).width)
    gCtx.font = `${currLine.size}px ${currLine.font}`
    let x, y
    switch (currLine.align) {
        case 'right':
            x = currLine.pos.x - (currLine.width)
            y = currLine.pos.y + (currLine.size / 2)
            break;
        case 'left':
            x = currLine.pos.x
            y = currLine.pos.y + (currLine.size / 2)
            break;
        case 'center':
            x = currLine.pos.x - (currLine.width / 2)
            y = currLine.pos.y + (currLine.size / 2)
            break;
    }
    drawLine(x, y, (x+currLine.width))
}

function drawLine(xStart, yStart, xEnd) {
    gCtx.setLineDash([5, 3]);
    gCtx.strokeStyle = 'white'

    gCtx.beginPath();
    gCtx.moveTo(xStart, yStart);
    gCtx.lineTo( xEnd, yStart);
    gCtx.stroke();
    gCtx.setLineDash([]);

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
            x: 185,
            y: 185
        },
        size: 25,
        align: 'center',
        color: 'white',
        strokeColor: 'black',
        width: parseInt(gCtx.measureText('This is my new line').width),
        isDragging: false,
        font: 'Impact',
    })
    if (gMeme.lines.length === 1) gMeme.lines[0].pos.y = 50
    else if (gMeme.lines.length === 2) gMeme.lines[1].pos.y = 300

}

function removeSelectedLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
}

function changeFont(font) {
    gMeme.lines[gMeme.selectedLineIdx].font = font

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



function resetMeme() {
    gMeme.lines.forEach(line => {
        line.strokeColor = 'black'
        line.color = 'white'
        line.size = 25
        line.align = 'center'
        line.isDragging = false
        line.font = 'impact'
    });
    gMeme.lines[0].width = 312
    gMeme.lines[0].pos.x = 185
    gMeme.lines[0].pos.y = 25
    gMeme.lines[1].width = 362
    gMeme.lines[1].pos.x = 185
    gMeme.lines[1].pos.y = 350
    gMeme.selectedLineIdx = 0
}

function getCurrLine(id) {
    return gMeme.lines[id]
}

function getSelectedLine() {
    return gMeme.lines[gMeme.selectedLineIdx]
}

function saveGalleryToStorage() {
    sameMemesToStorage()
}

function sameMemesToStorage() {
    saveToStorage('SavedMemes', gGalleryMemes)
}

function initSavedMemes() { 
    for(var i = 0 ; i < 4 ; i++) { 
        let img = `img/savedMemes/${i}.jpg`
        gGalleryMemes.push(img)
        sameMemesToStorage()
    }
}