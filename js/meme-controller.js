'use strict'

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
    if (val === 'minus') gMeme.lines[gMeme.selectedLineIdx].size = currLineSize-5
    else gMeme.lines[gMeme.selectedLineIdx].size = currLineSize+5
    renderCanvas()
}

function onMoveLine(val) { 
    let currLinePos = gMeme.lines[gMeme.selectedLineIdx].pos.y
    if (val === 'down') gMeme.lines[gMeme.selectedLineIdx].pos.y = currLinePos+5
    else gMeme.lines[gMeme.selectedLineIdx].pos.y = currLinePos-5
    renderCanvas()

}
function onEditLine() {
    let newLineInput = document.querySelector('.second-line-input').value
    gMeme.lines[gMeme.selectedLineIdx].txt = newLineInput
renderCanvas()
}

function onSwitchLines() {
    ++gMeme.selectedLineIdx
    if (gMeme.selectedLineIdx >= gMeme.lines.length) gMeme.selectedLineIdx = 0
    let elNewLine = document.querySelector('.second-line-input')
    elNewLine.placeholder = gMeme.lines[gMeme.selectedLineIdx].txt
    elNewLine.value = gMeme.lines[gMeme.selectedLineIdx].txt
    elNewLine.select();
    
}

function onNewLine() {
    newMemeLine()
    renderCanvas()
}