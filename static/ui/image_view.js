class ImageView {
    constructor(src) {
        this.src = src
        this._imageElement = this._createImageElement()
        this.mainElement = this._createMainElement()
    }

    setWidth(width) {
        console.log(this)
        this.mainElement.style.width = width
        this._imageElement.style.maxWidth = width
    }

    setHeight(height) {
        this.mainElement.style.height = height
        this._imageElement.style.maxHeight = height
    }

    _createMainElement() {
        let div = document.createElement('div')
        div.appendChild(this._imageElement)
        div.style.textAlign = 'center'
        div.style.backgroundColor = 'black'
        return div
    }

    _createImageElement() {
        let img = document.createElement('img')
        img.setAttribute('src', this.src)
        img.style.objectFit = 'contain'
        img.style.position = 'relative'
        img.style.margin = 'auto'
        img.style.width = '100%'
        img.style.height = '100%'
        return img;
    }
}
