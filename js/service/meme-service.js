'use strict'
var gImgs = [{
        id: 0,
        url: 'img/0.jpg'
    },
    {
        id: 1,
        url: 'img/1.jpg'
    },
    {
        id: 2,
        url: 'img/2.jpg'
    },
    {
        id: 3,
        url: 'img/3.jpg'
    },
    {
        id: 4,
        url: 'img/4.jpg'
    },
    {
        id: 5,
        url: 'img/5.jpg'
    },
    {
        id: 6,
        url: 'img/6.jpg'
    },
    {
        id: 7,
        url: 'img/7.jpg'
    },
    {
        id: 8,
        url: 'img/8.jpg'
    },
    {
        id: 9,
        url: 'img/9.jpg'
    },
    {
        id: 10,
        url: 'img/10.jpg'
    },
    {
        id: 11,
        url: 'img/11.jpg'
    },
    {
        id: 12,
        url: 'img/12.jpg'
    },
    {
        id: 13,
        url: 'img/13.jpg'
    },
    {
        id: 14,
        url: 'img/14.jpg'
    },
    {
        id: 15,
        url: 'img/15.jpg'
    },
    {
        id: 16,
        url: 'img/16.jpg'
    },
    {
        id: 17,
        url: 'img/17.jpg'
    },
];
var gElCanvas = document.getElementById('img-canvas') 
var gCtx;
var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    exportReady: false,
    lines: [{
            txt: 'This is my First line',
            pos: {
                x: (gElCanvas.width / 2),
                y: 40
            },
            size: 25,
            align: 'center',
            color: 'red',
            strokeColor: 'black',
            isDragging: false,
            font: 'Impact',
        },
        {
            txt: 'This is my Second line',
            pos: {
                x: (gElCanvas.width / 2),
                y: (gElCanvas.height -40)
            },
            size: 25,
            align: 'center',
            color: 'red',
            strokeColor: 'black',
            isDragging: false,
            font: 'Impact',
        }
    ]
}

function initCanvas() {
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
    drawLine(x, y, (x + currLine.width))
}

function drawLine(xStart, yStart, xEnd) {
    gCtx.setLineDash([5, 3]);
    gCtx.strokeStyle = 'white'
    gCtx.beginPath();
    gCtx.moveTo(xStart, yStart);
    gCtx.lineTo(xEnd, yStart);
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
            x: gElCanvas.width / 2,
            y: gElCanvas.height / 2
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

function changeMemeProp(property, val) {
    let activeLine = getSelectedLine()
    activeLine[property] = val
    renderCanvas()
}

//CLEAR, RESET, REMOVE//
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

function resetMeme() {
    var currImg = gMeme.selectedImgId
    gMeme =  {
        selectedImgId: currImg,
        selectedLineIdx: 0,
        exportReady: false,
        lines: [{
                txt: 'This is my First line',
                pos: {
                    x: (gElCanvas.width / 2),
                    y: 40
                },
                size: 25,
                align: 'center',
                color: 'red',
                strokeColor: 'black',
                isDragging: false,
                font: 'Impact',
            },
            {
                txt: 'This is my Second line',
                pos: {
                    x: (gElCanvas.width / 2),
                    y: (gElCanvas.height -40)
                },
                size: 25,
                align: 'center',
                color: 'red',
                strokeColor: 'black',
                isDragging: false,
                font: 'Impact',
            }
        ]
    }
}


//HELPER FUNCTIONS//
function getCurrLine(id) {
    return gMeme.lines[id]
}

function getSelectedLine() {
    return gMeme.lines[gMeme.selectedLineIdx]
}

//LOCAL STORAGE FUNCTIONS//
function saveGalleryToStorage() {
    sameMemesToStorage()
}

function sameMemesToStorage() {
    saveToStorage('SavedMemes', gGalleryMemes)
}

function initSavedMemes() {
    sameMemesToStorage()
}