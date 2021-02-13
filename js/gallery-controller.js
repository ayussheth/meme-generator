function onImgPick(id) {
    gMeme.selectedImgId = id
    renderEditor(id)
}

function renderEditor(id) {

    let elMainContainer = document.querySelector('.main-container');
    let elEditorContainer = document.querySelector('.editor-container')
    let elGalleryContainer = document.querySelector('.gallery-grid')
    elMainContainer.classList.add('editor-shown')
    elEditorContainer.classList.add('shown')
    elGalleryContainer.classList.add('shrunken')
    let elClearButton = document.querySelector('.toggle-lines-icon')
    elClearButton.innerHTML = '<i class="fas fa-eye-slash"></i>'
    gMeme.exportReady = false 
    resetMeme()
    clearCanvas()
    initCanvas()

}

function onCloseEditor() {
    let elMainContainer = document.querySelector('.main-container');
    let elEditorContainer = document.querySelector('.editor-container')
    let elGalleryContainer = document.querySelector('.gallery-grid')
    elMainContainer.classList.remove('editor-shown')
    elEditorContainer.classList.remove('shown')
    elGalleryContainer.classList.remove('shrunken')
}

function onSavedGalleryClick(){
    renderSavedGallery()
}

function onGalleryToggle() { 
    let elToggleBtn = document.querySelector('.toggle-btn')
    if (!savedGalleryActive){
        savedGalleryActive=true
        renderSavedGallery()
        elToggleBtn.innerText=`Return to Meme Generator`
    }
    else { 
        savedGalleryActive=false 
        renderGallery()
        elToggleBtn.innerText=`Saved Memes`

    }
}