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
    if (val === 'minus') gMeme.lines[gMeme.selectedLineIdx].size = currLineSize - 5
    else gMeme.lines[gMeme.selectedLineIdx].size = currLineSize + 5
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
    gMeme.lines[gMeme.selectedLineIdx].width =  parseInt(gCtx.measureText(newLineInput).width)
    renderCanvas()
}

function onSwitchLines() {
    ++gMeme.selectedLineIdx
    if (gMeme.selectedLineIdx >= gMeme.lines.length) gMeme.selectedLineIdx = 0
    let elNewLine = document.querySelector('.line-input')
    elNewLine.placeholder = gMeme.lines[gMeme.selectedLineIdx].txt
    elNewLine.value = gMeme.lines[gMeme.selectedLineIdx].txt
    elNewLine.select();
    renderCanvas()
}

function onNewLine() {
    newMemeLine()
    renderCanvas()
}

function onClearCanvas() {
    clearMeme()
    renderCanvas()
}

function onDeleteLine() {
    removeSelectedLine()
    renderCanvas()
}

function onDown(e) {
    e.preventDefault();
    const startX = e.offsetX
    const startY = e.offsetY
    for (var i = 0; i < gMeme.lines.length; i++) {
        if (textHittest(startX, startY, i)) {
            gMeme.selectedLineIdx = i;
        }
    }
    let elNewLine = document.querySelector('.line-input')
    elNewLine.placeholder = gMeme.lines[gMeme.selectedLineIdx].txt
    elNewLine.value = gMeme.lines[gMeme.selectedLineIdx].txt
    elNewLine.select();
    renderCanvas()
}
function textHittest(x,y,textIndex){
    let rect=gMeme.lines[textIndex].rect;
    return(x>=rect.xStart && 
        x<=rect.xStart+rect.xEnd &&
        y>=rect.yStart && 
        y<=rect.yEnd);
}
