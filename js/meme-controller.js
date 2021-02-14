'use strict'
var startX;
var startY;

//CHANGES TO THE APPEAREANCE OF THE LINE
function onChangeColor() {
    let pickedColor = document.querySelector('#user-color-picker').value
    changeMemeProp('color', pickedColor)
}

function onUpdateFont() {
    let selector = document.getElementById('selectFontFamily');
    let font = selector.options[selector.selectedIndex].value;
    changeMemeProp('font', font)
}

function onChangeStrokeColor() {
    let pickedColor = document.querySelector('#user-stroke-color-picker').value
    changeMemeProp('strokeColor', pickedColor)
}

function onChangeSize(val) {
    let currLine = getSelectedLine()
    let currLineSize = currLine.size
    if (val === 'plus')     changeMemeProp('size', currLineSize+2)
    else if (currLineSize <= 20) return
    else     changeMemeProp('size', currLineSize-2)
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
    activeLine.width = parseInt(gCtx.measureText(newLineInput).width)
    changeMemeProp('txt', newLineInput)
}

function onChangeAlign(val) {
    changeMemeProp('align', val)
}

///////////////////////////////////

//ADDING, REMOVING, CLEARING
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
///////////////////////////////////

//SAVE AND DOWNLOAD
function onDownloadMeme(elLink) {
    const data = gElCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'ShrekMeme';

}

function onSaveMeme() {
    const memeUrl = (gElCanvas.toDataURL());
    gGalleryMemes.push({
        img: memeUrl,
        date: memeDate.toLocaleDateString()
    });
    saveGalleryToStorage();
}

///////////////////////////////////

//MOUSE AND TOUCH EVENTS 
function onDown(ev) {
    ev.preventDefault();
    const pos = getEvPos(ev)
    gMeme.exportReady = false

    gMeme.lines.forEach((line, idx) => {
        if (textHittest(pos.x, pos.y, idx)) {
            gMeme.selectedLineIdx = idx;
            gMeme.lines[gMeme.selectedLineIdx].isDragging = true
            document.body.style.cursor = 'grab'
        }
    });
    let elNewLine = document.querySelector('.line-input')
    elNewLine.placeholder = gMeme.lines[gMeme.selectedLineIdx].txt
    elNewLine.value = gMeme.lines[gMeme.selectedLineIdx].txt
    elNewLine.select();
    renderCanvas()
}

function textHittest(x, y, textIndex) {
    let line = gMeme.lines[textIndex];
    line.width = gCtx.measureText(line.txt).width;
    return (y > line.pos.y - line.size &&
        //no idea why but touch only works on my mobile if i apply this y-120.
        y - 120 < line.pos.y + line.size &&
        x > line.pos.x - (line.width * 2) &&
        x < line.pos.x + (line.width * 2)
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