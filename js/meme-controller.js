'use strict'
function onChangeColor() { 
    let pickedColor = document.querySelector('#user-color-picker').value
    gMeme.lines[0].color = pickedColor
    initCanvas()
}
function onChangeStrokeColor() { 
    let pickedColor = document.querySelector('#user-stroke-color-picker').value
    gMeme.lines[0].strokeColor = pickedColor
    initCanvas()
}

function onAddLine() { 
    let newLineInput = document.querySelector('.second-line-input').value
    drawText(newLineInput, 250, 450)  
}
