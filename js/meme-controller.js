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

function onAddLine() {
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