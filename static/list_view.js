
class ListView {
    constructor() {
        this.mainDiv = this._createMainDiv()
    }

    getMainElement() {
        return this.mainDiv
    }

    addElement(element) {
        this.mainDiv.appendChild(this._createContainerDiv(element))
    }

    _createMainDiv() {
        let div = document.createElement('div')
        div.style.borderWidth = '1px'
        div.style.borderColor = 'black'
        div.style.padding = '0 5px'
        div.style.margin = '5px'
        div.style.background = '#cdf'
        return div
    }

    _createContainerDiv(element) {
        let div = document.createElement('div')
        div.style.margin = '5px 0'
        div.appendChild(element)
        return div
    }
}
