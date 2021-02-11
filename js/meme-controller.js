'use strict'
var startX;
var startY;

function onChangeColor() {
    let pickedColor = document.querySelector('#user-color-picker').value
    gMeme.lines[gMeme.selectedLineIdx].color = pickedColor
    renderCanvas()
}

function onChangeStrokeColor() {
    let pickedColor = document.querySelector('#user-stroke-color-picker').value

    gMeme.lines[gMeme.selectedLineIdx].strokeColor = pickedColor
    renderCanvas()
}

function onChangeSize(val) {
    let currLineSize = gMeme.lines[gMeme.selectedLineIdx].size
    if (val === 'plus') gMeme.lines[gMeme.selectedLineIdx].size = currLineSize + 5
    else if (currLineSize === 10) return
    else gMeme.lines[gMeme.selectedLineIdx].size = currLineSize - 5
    clearMemeRects()
    renderCanvas()
}

function onMoveLine(val) {
    let currLinePos = gMeme.lines[gMeme.selectedLineIdx].pos.y
    if (val === 'down') gMeme.lines[gMeme.selectedLineIdx].pos.y = currLinePos + 5
    else gMeme.lines[gMeme.selectedLineIdx].pos.y = currLinePos - 5
    renderCanvas()

}

function onEditLine() {
    let newLineInput = document.querySelector('.line-input').value
    gMeme.lines[gMeme.selectedLineIdx].txt = newLineInput
    gMeme.lines[gMeme.selectedLineIdx].width = parseInt(gCtx.measureText(newLineInput).width)
    renderCanvas()
}

function onSwitchLines() {
    ++gMeme.selectedLineIdx
    if (gMeme.selectedLineIdx >= gMeme.lines.length) gMeme.selectedLineIdx = 0
    let elNewLine = document.querySelector('.line-input')
    elNewLine.placeholder = gMeme.lines[gMeme.selectedLineIdx].txt
    elNewLine.value = gMeme.lines[gMeme.selectedLineIdx].txt
    elNewLine.select();
    gMeme.exportReady = false
    renderCanvas()
}

function onNewLine() {
    newMemeLine()
    renderCanvas()
}

function onClearCanvas() {
    gMeme.exportReady = false
    clearMeme()
    renderCanvas()
}

function onDeleteLine() {
    removeSelectedLine()
    renderCanvas()
}

function onDownloadMeme() {
    gMeme.exportReady = true
    clearMemeRects()
    renderCanvas()
}

function onDown(ev) {
    ev.preventDefault();
    const pos = getEvPos(ev)
    for (var i = 0; i < gMeme.lines.length; i++) {
        if (textHittest(pos.x, pos.y, i)) {
            console.log(`hit the line:${gMeme.lines[i].txt}`);
            gMeme.selectedLineIdx = i;
            gMeme.lines[gMeme.selectedLineIdx].isDragging = true
            document.body.style.cursor = 'grab'
        }
    }
    let elNewLine = document.querySelector('.line-input')
    elNewLine.placeholder = gMeme.lines[gMeme.selectedLineIdx].txt
    elNewLine.value = gMeme.lines[gMeme.selectedLineIdx].txt
    if (!gTouchEvs.includes(ev.type)) elNewLine.select();
    renderCanvas()
}

function textHittest(x, y, textIndex) {
    let rect = gMeme.lines[textIndex].rect;
    return (x >= rect.xStart &&
        x <= rect.xStart + rect.xEnd &&
        y >= rect.yStart &&
        y <= rect.yEnd);
}

function onMove(ev) {
    if (gMeme.lines[gMeme.selectedLineIdx].isDragging) {
        document.body.style.cursor = 'grabbing'
        const pos = getEvPos(ev)
        const dx = pos.x - gMeme.lines[gMeme.selectedLineIdx].pos.x
        const dy = pos.y - gMeme.lines[gMeme.selectedLineIdx].pos.y
        gMeme.lines[gMeme.selectedLineIdx].pos.x += dx
        gMeme.lines[gMeme.selectedLineIdx].pos.y += dy
        gMeme.lines[gMeme.selectedLineIdx].pos = pos
        renderCanvas()
    }
}

function onUp() {
    gMeme.lines[gMeme.selectedLineIdx].isDragging = false
    document.body.style.cursor = 'default'
    renderCanvas()
}


function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}