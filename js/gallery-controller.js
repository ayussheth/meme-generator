'use strict'
function init() {
    initCanvas();
    addMouseListeners();
    addTouchListeners();
    renderGallery();
}

function renderEditor(isSavedMeme) {
    let elMainContainer = document.querySelector('.main-container');
    let elEditorContainer = document.querySelector('.editor-container')
    let elGalleryContainer = document.querySelector('.gallery-grid')
    elMainContainer.classList.add('editor-shown')
    elEditorContainer.classList.add('shown')
    elGalleryContainer.classList.add('shrunken')
    let elClearButton = document.querySelector('.toggle-lines-icon')
    elClearButton.innerHTML = '<i class="fas fa-eye-slash"></i>'
    gMeme.exportReady = true
    if (!isSavedMeme) {
        resetMeme()
        clearCanvas()
        initCanvas()
    }
    renderCanvas()
}

function onCloseEditor() {
    let elMainContainer = document.querySelector('.main-container');
    let elEditorContainer = document.querySelector('.editor-container')
    let elGalleryContainer = document.querySelector('.gallery-grid')
    elMainContainer.classList.remove('editor-shown')
    elEditorContainer.classList.remove('shown')
    elGalleryContainer.classList.remove('shrunken')
    let elSavedMeme = document.getElementById('saved-meme-container')
    elSavedMeme.classList.remove('shown')
}

function onImgPick(id) {
    gMeme.selectedImgId = id
    renderEditor()
}

function onSavedMemePick(idx) {
    let memes = loadFromStorage('SavedMemes')
    console.log(memes);
    let activeMeme = memes[idx]
    gMeme.selectedImgId = activeMeme.imgId;
    gMeme.lines = []
    gMeme.lines.push(...activeMeme.lines)
    renderEditor(true)

}
//SAVED MEMES GALLERY//
function onSavedGalleryClick() {
    renderSavedGallery()
}

function onGalleryToggle() {
    let elToggleBtn = document.querySelector('.toggle-btn')
    if (!savedGalleryActive) {
        savedGalleryActive = true
        renderSavedGallery()
        elToggleBtn.innerHTML = `Return to Meme Generator <i class="fas fa-undo">`
    } else {
        savedGalleryActive = false
        elToggleBtn.innerHTML = `Saved Memes <i class="fas fa-undo">`
        let elSavedMeme = document.getElementById('saved-meme-container')
        elSavedMeme.classList.remove('shown')
        let elEditorContainer = document.querySelector('.editor-container')
        elEditorContainer.classList.remove('shown')
        onCloseEditor()
        renderGallery()
    }
}



function toggleSavedMemeShown() {
    let elSavedMeme = document.getElementById('saved-meme-container')
    elSavedMeme.classList.toggle('shown')

}

function onDeleteSavedMeme(idx) {
    let savedMemesGallery = loadFromStorage('SavedMemes')
    console.log(savedMemesGallery);
    savedMemesGallery.splice(idx, 1)
    saveMemesToStorage(savedMemesGallery)
    renderSavedGallery()
}