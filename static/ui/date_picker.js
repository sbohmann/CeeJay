class DatePicker {
    constructor() {
        this.mainElement = this._createMainElement()
    }

    _createMainElement() {
        let div = document.createElement('div')
        this._createYearHeader()
        this._createHeaders()
        return div
    }

    _createHeaders() {
        this._yearHeader = this._createYearHeader()
        this._monthHeader = this._createMonthHeader()
        this.mainElement.addElement(this._yearHeader)
        this.mainElement.addElement(this._monthHeader)
    }

    _createYearHeader() {
        let header = new HorizontalLabelSwitch()
        return header
    }

    _createMonthHeader() {
        let header = new HorizontalLabelSwitch()
        return header
    }
}

class HorizontalLabelSwitch {
    constructor() {
        this.mainElement = this._createMainElement()
    }

    _createMainElement() {
        let div = document.createElement('div')
        div.style.textAlign = 'center'
        this._previousButton = this._createTextLink('<')
        this._label = document.createElement('span')
        this._nextButton = this._createTextLink('>')
        div.addElement(this._previousButton)
        div.addElement(this._label)
        div.addElement(this._nextButton)
        div.addElement()
        return div
    }

    _createTextLink(text) {
        let link = document.createElement('a')
        link.addElement(document.createTextNode(text))
        return link
    }
}