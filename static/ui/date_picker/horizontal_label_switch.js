
class HorizontalLabelSwitch {
    constructor() {
        this._createMainElement();
        this._createPreviousButton();
        this._createLabel();
        this._createNextButton();
    }

    set labelText(text) {
        this._label.textContent = text
    }

    set navigationHandler(handler) {
        this._navigationHandler = handler
    }

    _createMainElement() {
        this.mainElement = document.createElement('div')
        this.mainElement.style.textAlign = 'center'
    }

    _createPreviousButton() {
        this._previousButton = this._createTextLink('◀')
        this._previousButton.onclick = () => this._navigationEvent(false)
        this.mainElement.appendChild(this._previousButton)
    }

    _createLabel() {
        this._label = document.createElement('span')
        this._label.style.marginLeft = '1em'
        this._label.style.marginRight = '1em'
    }

    _createNextButton() {
        this.mainElement.appendChild(this._label)
        this._nextButton = this._createTextLink('▶')
        this._nextButton.onclick = () => this._navigationEvent(true)
        this.mainElement.appendChild(this._nextButton)
    }

    _createTextLink(text) {
        let link = document.createElement('a')
        link.appendChild(document.createTextNode(text))
        link.style.color = '#369'
        return link
    }

    _navigationEvent(forward) {
        if (this._navigationHandler) {
            this._navigationHandler(forward)
        }
    }
}
