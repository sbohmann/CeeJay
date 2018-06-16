
class DatePicker {
    constructor(date) {
        if (date === undefined) {
            this._date = LocalDate.now()
        } else {
            this._date = date
        }
        this._createMainElement()
        this._fillData()
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
        this.mainElement.appendChild(this._monthView.mainElement)
    }

    _createYearHeader() {
        let header = new HorizontalLabelSwitch()
        header.navigationHandler = forward => this._adjustYear(forward)
        return header
    }

    _createMonthHeader() {
        let header = new HorizontalLabelSwitch()
        header.navigationHandler = forward => this._adjustMonth(forward)
        return header
    }

    _createMonthView() {
        return new MonthView(this._date)
    }

    _adjustYear(forward) {
        this._date = this._date.plusYears(forward ? 1 : -1)
        this._fillData()
    }

    _adjustMonth(forward) {
        this._date = this._date.plusMonths(forward ? 1 : -1)
        this._fillData()
    }

    _fillData() {
        this._yearHeader.labelText = this._date.year
        this._monthHeader.labelText = this._date.month
        this._monthView.date = this._date
    }
}
