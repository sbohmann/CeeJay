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
        this.mainElement.appendChild(this._monthView.mainElement)
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

        this._dayShift = 0
        this._date = LocalDate.now()

        this._weekDayCells = Array(7)
        this._weekNumberCells = Array(6)
        this._dayCells = Array(this._dataRows * this._dataColumns)

        this._createMainElement()

        this._fillData()
    }

    set date(date) {
        this.date = date
    }

    _createMainElement() {
        this.mainElement = document.createElement('div')
        this._cerateTable()
    }

    _cerateTable() {
        this._table = document.createElement('table')
        this._table.style.margin = 'auto'
        this._createMonthView()
        this._createRows()
    }

    _createMonthView() {
        this.mainElement.appendChild(this._table)
    }

    _createRows() {
        this._createHeaderRow()
        for (let index = 0; index < this._dataRows; ++index) {
            this._createDataRow(index)
        }
    }

    _createHeaderRow() {
        let row = document.createElement('tr')
        row.appendChild(document.createElement('th'))
        for (let index = 0; index < this._dataColumns; ++index) {
            row.appendChild(this._createTableHeaderCell(index))
        }
        this._table.appendChild(row)
    }

    _createTableHeaderCell(index) {
        let cell = document.createElement('th')
        this._weekDayCells[index] = cell
        this._pad(cell)
        this._color(cell)
        return cell
    }

    _createWeekNumberCell(index) {
        let cell = document.createElement('th')
        this._weekNumberCells[index] = cell
        this._pad(cell)
        this._color(cell)
        return cell
    }

    _createDataRow(index) {
        let row = document.createElement('tr')
        row.appendChild(this._createWeekNumberCell(index))
        this._addDayCells(row, index)
        this._table.appendChild(row)
    }

    _addDayCells(row, rowIndex) {
        for (let columnIndex = 0; columnIndex < this._dataColumns; ++columnIndex) {
            let cell = this._createDayCell(this.calculateDayIndex(rowIndex, columnIndex))
            row.appendChild(cell)
        }
    }

    _createDayCell(index) {
        let cell = document.createElement('td')
        this._dayCells[index] = cell
        this._pad(cell)
        return cell
    }

    _pad(cell) {
        cell.style.padding = '5px'
        cell.style.textAlign = 'center'
    }

    _color(cell) {
        cell.style.color = 'white'
        cell.style.background = '#369'
    }

    _fillData() {
        this._fillWeekDayNames()
        this._fillWeekNumbers()
        this._fillDays()
    }

    _fillWeekDayNames() {
        for (let [index, cell] of this._weekDayCells.entries()) {
            cell.textContent = this._weekDayNameForIndex(index)
        }
    }

    _weekDayNameForIndex(index) {
        // TODO localize, using first day (sat, sun, or mon)
        // TODO return localization keys instead of user facing string literals
        switch(this._rolledDayIndex(index)) {
            case 0: return "Sun"
            case 1: return "Mon"
            case 2: return "Tue"
            case 3: return "Wed"
            case 4: return "Thu"
            case 5: return "Fri"
            case 6: return "Sat"
            default:
                console.log("Unable to match index to week day name: " + index)
                return "???"
        }
    }

    _rolledDayIndex(index) {
        return index + this._dayShift
    }

    _fillWeekNumbers() {
        for (let [index, cell] of this._weekNumberCells.entries()) {
            // TODO localize using a week day rule
            cell.textContent = '# ' + (index + 1)
        }
    }

    _fillDays() {
        for (let rowIndex  = 0; rowIndex < this._dataRows; ++rowIndex) {
            for (let columnIndex = 0; columnIndex < this._dataColumns; ++columnIndex) {
                this._fillDay(rowIndex, columnIndex)
            }
        }
    }

    _fillDay(rowIndex, columnIndex) {
        let dayIndex = this.calculateDayIndex(rowIndex, columnIndex)
        let dayCell = this._dayCells[dayIndex]
        if (dayIndex >= 6 && dayIndex < 37) {
            dayCell.textContent = dayIndex - 5
        }
    }

    calculateDayIndex(rowIndex, columnIndex) {
        return rowIndex * this._dataColumns + columnIndex
    }
}

class LocalDate {
    constructor(year, month, day) {
        this._year = year
        this._month = month
        this._day = day

        this._check()
    }

    get year() {
        return this._year;
    }

    withYear(year) {
        return new Date(year, this._month, this._day)
    }

    get month() {
        return this._month;
    }

    withMonth(month) {
        return new Date(this._year, month, this._day)
    }

    get day() {
        return this._day;
    }

    withDay(day) {
        return new Date(this._year, this._month, day)
    }

    static now() {
        let dateTime = new Date()
        let result = new LocalDate(dateTime.getFullYear(), dateTime.getMonth() + 1, dateTime.getDate())
        console.log(JSON.stringify(result))
        return result;
    }

    static maximumDay(month) {
        switch (month) {
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
                return 31
            case 2:
                return this.isLeapYear() ? 29 : 28
        }
    }

    static isLeapYear() {
        if (this._year % 400 === 0) {
            return true
        } else if (this._year % 4 === 0) {
            return this._year % 100 !== 0
        } else {
            return false
        }
    }

    _check() {
        this._checkDefined(this._year, "year")
        this._checkDefined(this._month, "month")
        this._checkDefined(this._day, "day")

        this._checkIsInteger(this._year, "year")

        this._checkIsInteger(this._month, "month")
        this._checkPositive(this._month, "month")
        this._checkMaximum(12, this._month, "month")

        this._checkIsInteger(this._day, "day")
        this._checkPositive(this._day, "day")
        this._checkMaximum(LocalDate.maximumDay(this._month), this._day, "day")
    }

    _checkDefined(value, name) {
        if (value === undefined) {
            throw "Undefined argument '" + name + "'"
        }
    }

    _checkIsInteger(value, name) {
        if (!Number.isInteger(value)) {
            throw "Argument '" + name + "' is not an integer: " + value
        }
    }

    _checkPositive(value, name) {
        if (value < 1) {
            throw "Argument '" + name + "' is not an integer: " + value
        }
    }

    _checkMaximum(maximum, value, name) {
        if (value > maximum) {
            throw "Argument '" + name + "' is > " + maximum + ": " + value
        }
    }
}
