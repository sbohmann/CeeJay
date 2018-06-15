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
        this._monthView = this._createMonthView()
        this.mainElement.appendChild(this._yearHeader.mainElement)
        this.mainElement.appendChild(this._monthHeader.mainElement)
        this.mainElement.appendChild()
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

    _createMonthView() {
        let view = new MonthView()
        return view
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
        this._previousButton = this._createTextLink('◀')
        this._label = document.createElement('span')
        this._label.style.marginLeft = '1em'
        this._label.style.marginRight = '1em'
        this._nextButton = this._createTextLink('▶')
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

class MonthView {
    constructor() {
        this._dataRows = 6
        this._dataColumns = 7

        this._createMainElement()
    }

    _createMainElement() {
        this.mainElement = document.createElement('div')
        this._table = document.createElement('table')
        this._createRows()
    }

    _createRows() {
        this._craeateHeaderRow()
        for (let index of this._dataRows) {
            alert(index)
        }
    }

    _craeateHeaderRow() {
        let row = document.createElement('tr')
        row.appendChild(document.createElement('th'))
        for (let index of this._dataColumns) {
            this._table.appendChild(this._createTableHeaderCell(index))
        }
        this._table.appendChild(row)
    }

    _createTableHeaderCell(index) {
        let cell = document.createElement('th')
        cell.textContent = this._weekDayNameForIndex(index)
        return cell
    }

    _weekDayNameForIndex(index) {
        // TODO localize, including first day (sat, sun, or mon)
        switch(index) {
            case 0: return 'Sun'
            case 1: return 'Mon'
            case 2: return 'Tue'
            case 3: return 'Wed'
            case 4: return 'Thu'
            case 5: return 'Fri'
            case 6: return 'Sat'
            default:
                console.log('Unable to match index to week day name: ' + index)
                return '???'
        }
    }
}
