class DatePicker {
    constructor() {
        this._createMainElement()
    }

    _createMainElement() {
        this.mainElement = document.createElement('div')
        this._createYearHeader()
        this._createHeaders()
    }

    _createHeaders() {
        this._yearHeader = this._createYearHeader()
        this._monthHeader = this._createMonthHeader()
        this.mainElement.appendChild(this._yearHeader.mainElement)
        this.mainElement.appendChild(this._monthHeader.mainElement)
    }

    _createYearHeader() {
        let header = new HorizontalLabelSwitch()
        header.setLabelText("Year")
        return header
    }

    _createMonthHeader() {
        let header = new HorizontalLabelSwitch()
        header.setLabelText("Month")
        return header
    }
}

class HorizontalLabelSwitch {
    constructor() {
        this.mainElement = this._createMainElement()
    }

    setLabelText(text) {
        this._label.textContent = text
    }

    _createMainElement() {
        let div = document.createElement('div')
        div.style.textAlign = 'center'
        this._previousButton = this._createTextLink('<')
        this._label = document.createElement('span')
        this._nextButton = this._createTextLink('>')
        div.appendChild(this._previousButton)
        div.appendChild(this._label)
        div.appendChild(this._nextButton)
        return div
    }

    _createTextLink(text) {
        let link = document.createElement('a')
        link.appendChild(document.createTextNode(text))
        return link
    }
}
