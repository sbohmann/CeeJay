
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
        this.mainElement.style.position = 'relative'
        this.mainElement.style.fontSize = 'larger'
        this.mainElement.style.fontWeight = 'bold'
    }

    _createPreviousButton() {
        this._previousButton = this._createTextButton('<')
        this._previousButton.style.position = 'absolute'
        this._previousButton.style.left = '0'
        this._previousButton.onclick = () => this._navigationEvent(false)
        this.mainElement.appendChild(this._previousButton)
    }

    _createLabel() {
        this._label = document.createElement('span')
        this._label.style.marginLeft = '1em'
        this._label.style.marginRight = '1em'
        this.mainElement.appendChild(this._label)
    }

    _createNextButton() {
        this._nextButton = this._createTextButton('>')
        this._nextButton.style.position = 'absolute'
        this._nextButton.style.right = '0'
        this._nextButton.onclick = () => this._navigationEvent(true)
        this.mainElement.appendChild(this._nextButton)
    }

    _createTextButton(text) {
        let button = document.createElement('button')
        button.appendChild(document.createTextNode(text))
        button.style.color = '#369'
        button.style.border = 'none'
        button.style.background = 'none'
        button.style.cursor = 'pointer'
        button.style.font = 'inherit'
        button.style.padding = 'inherit'
        button.style.margin = 'inherit'
        return button
    }

    _navigationEvent(forward) {
        if (this._navigationHandler) {
            this._navigationHandler(forward)
        }
    }
}
