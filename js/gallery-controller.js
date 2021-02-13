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
    let elSavedMeme = document.getElementById('saved-meme-container')
    elSavedMeme.classList.remove('shown')
}

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

function onSavedMemePick(idx) {
    gGalleryMemes = loadFromStorage('SavedMemes')
    let meme = gGalleryMemes[idx]
    let elMainContainer = document.querySelector('.main-container');
    let elSavedMeme = document.getElementById('saved-meme-container')
    let elGalleryContainer = document.querySelector('.gallery-grid')
    elMainContainer.classList.add('editor-shown')
    elSavedMeme.classList.add('shown')
    elGalleryContainer.classList.add('shrunken')
    elSavedMeme.innerHTML = `<img src="${meme.img}"></img><h4>Date Created: ${meme.date}</h4><h4 class="delete-meme-btn" onclick="onDeleteSavedMeme(${idx})">Delete meme?</h4>`
}

function toggleSavedMemeShown() {
    let elSavedMeme = document.getElementById('saved-meme-container')
    elSavedMeme.classList.toggle('shown')

}

function onDeleteSavedMeme(idx) {
    gGalleryMemes.splice(idx, 1)
    sameMemesToStorage()
    if(!gGalleryMemes.length) initSavedMemes()
    renderSavedGallery()
}