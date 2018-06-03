class ListView {
    constructor() {
        this.mainElement = this._createMainElement()
    }

    addElement(element) {
        this.mainElement.appendChild(this._createContainerDiv(element))
    }

    _createMainElement() {
        let div = document.createElement('div')
        div.style.border = '1px black solid'
        div.style.padding = '0 5px'
        div.style.margin = '5px'
        div.style.background = '#cdf'
        return div
    }

    _createContainerDiv(element) {
        let div = document.createElement('div')
        div.style.margin = '5px 0'
        div.style.padding = '0'
        div.appendChild(element)
        return div
    }
}
