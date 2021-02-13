'use strict'
var startX;
var startY;
//CHANGES TO THE APPEAREANCE OF THE LINE

function onChangeColor() {
    let activeLine = getSelectedLine()
    let pickedColor = document.querySelector('#user-color-picker').value
    activeLine.color = pickedColor
    renderCanvas()
}

function onUpdateFont() {
    let selector = document.getElementById('selectFontFamily');
    let font = selector.options[selector.selectedIndex].value;
    changeFont(font)
    renderCanvas()
}

function onChangeStrokeColor() {
    let activeLine = getSelectedLine()
    let pickedColor = document.querySelector('#user-stroke-color-picker').value
    activeLine.strokeColor = pickedColor
    renderCanvas()
}

function onChangeSize(val) {
    let currLine = getSelectedLine()
    let currLineSize = currLine.size
    renderCanvas()
    if (val === 'plus') currLine.size = currLineSize + 5
    else if (currLineSize === 10) return
    else currLine.size = currLineSize - 5
    renderCanvas()
}

function onMoveLine(val) {
    let activeLine = getSelectedLine()
    let currLinePos = activeLine.pos.y
    if (val === 'down') activeLine.pos.y = currLinePos + 5
    else activeLine.pos.y = currLinePos - 5
    renderCanvas()

}

function onEditLine() {
    let activeLine = getSelectedLine()
    let newLineInput = document.querySelector('.line-input').value
    activeLine.txt = newLineInput
    activeLine.width = parseInt(gCtx.measureText(newLineInput).width)
    renderCanvas()
}


// }

function onChangeAlign(val) {
    let currLine = getSelectedLine()
    currLine.align = val
    renderCanvas()
}
///////////////////////////////////
function onSwitchLines() {
    let activeLine = getSelectedLine()
        ++gMeme.selectedLineIdx
    if (gMeme.selectedLineIdx >= gMeme.lines.length) gMeme.selectedLineIdx = 0
    let elNewLine = document.querySelector('.line-input')
    elNewLine.placeholder = activeLine.txt
    elNewLine.value = activeLine.txt
    elNewLine.select();
    gMeme.exportReady = false
    renderCanvas()
}

function onNewLine() {
    newMemeLine()
    renderCanvas()
}

function onClearCanvas() {
    gMeme.exportReady = true
    clearMeme()
    renderCanvas()
}

function onDeleteLine() {
    removeSelectedLine()
    renderCanvas()
}

function onClearLines() {
    let elClearButton = document.querySelector('.toggle-lines-icon')
    if (elClearButton.innerHTML === '<i class="fas fa-eye-slash"></i>') elClearButton.innerHTML = '<i class="fas fa-eye"></i>'
    else elClearButton.innerHTML = '<i class="fas fa-eye-slash"></i>'
    gMeme.exportReady = !gMeme.exportReady
    renderCanvas()
}

function onDownloadMeme(elLink) {
    const data = gElCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'ShrekMeme';

}

function onSaveMeme(){
    const memeUrl = (gElCanvas.toDataURL('image/jpeg', 0.1));
    gGalleryMemes.push(memeUrl);
    saveGalleryToStorage();
}

function editFromGallery(){

}
//MOUSE AND TOUCH EVENTS 
function onDown(ev) {
    ev.preventDefault();
    const pos = getEvPos(ev)
    gMeme.lines.forEach((line, idx) => {
        if (textHittest(pos.x, pos.y, idx)) {
            console.log(`hit line: ${line.txt}`);
            gMeme.selectedLineIdx = idx;
            gMeme.lines[gMeme.selectedLineIdx].isDragging = true
            document.body.style.cursor = 'grab'
            renderCanvas()
        }

    });

    let elNewLine = document.querySelector('.line-input')
    elNewLine.placeholder = gMeme.lines[gMeme.selectedLineIdx].txt
    elNewLine.value = gMeme.lines[gMeme.selectedLineIdx].txt
    if (!gTouchEvs.includes(ev.type)) elNewLine.select();
    renderCanvas()
}

function textHittest(x, y, textIndex) {
    let line = gMeme.lines[textIndex];
    return (y > line.pos.y - line.size &&
        y < gElCanvas.height - (gElCanvas.height - line.pos.y) &&
        x > line.pos.x - (line.width / 2) &&
        x < line.pos.x + (line.width / 2) 
    )
}

function onMove(ev) {
    let activeLine = getSelectedLine()
    if (activeLine.isDragging) {
        document.body.style.cursor = 'grabbing'
        const pos = getEvPos(ev)
        const dx = pos.x - activeLine.pos.x
        const dy = pos.y - activeLine.pos.y
        activeLine.pos.x += dx
        activeLine.pos.y += dy
        activeLine.pos = pos
        renderCanvas()
    }
}

function onUp() {
    let activeLine = getSelectedLine()
    activeLine.isDragging = false
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
