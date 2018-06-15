
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
        let view = new MonthView(this._date)
        return view
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

class HorizontalLabelSwitch {
    constructor(date) {
        this.mainElement = this._createMainElement()
    }

    set labelText(text) {
        this._label.textContent = text
    }

    set navigationHandler(handler) {
        this._navigationHandler = handler
    }

    _createMainElement() {
        let div = document.createElement('div')
        div.style.textAlign = 'center'
        this._previousButton = this._createTextLink('◀')
        this._previousButton.onclick = () => this._navigationEvent(false)
        this._label = document.createElement('span')
        this._label.style.marginLeft = '1em'
        this._label.style.marginRight = '1em'
        this._nextButton = this._createTextLink('▶')
        this._nextButton.onclick = () => this._navigationEvent(true)
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

    _navigationEvent(forward) {
        if (this._navigationHandler) {
            this._navigationHandler(forward)
        }
    }
}

class MonthView {
    constructor(date) {
        if (date === undefined) {
            throw "Undefined argument: date"
        }
        this._date = date

        this._dataRows = 6
        this._dataColumns = 7

        this._dayShift = 0

        this._weekDayCells = Array(7)
        this._weekNumberCells = Array(6)
        this._dayCells = Array(this._dataRows * this._dataColumns)

        this._createMainElement()

        this._fillData()
    }

    set date(date) {
        this._date = date
        this._fillData()
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
        this._setBoundaryIndices();
        this._fillWeekDayNames()
        this._fillWeekNumbers()
        this._fillDays()
    }

    _setBoundaryIndices() {
        let firstWeekDay = new LocalDate(this._date.year, this._date.month, 1).weekday
        this._firstDayIndex = firstWeekDay - 1
        let daysInMonth = LocalDate.daysInMonth(this._date.year, this._date.month)
        this._lastDayIndex = this._firstDayIndex + daysInMonth - 1
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
        if (dayIndex >= this._firstDayIndex && dayIndex <= this._lastDayIndex) {
            dayCell.textContent = dayIndex - this._firstDayIndex + 1
        } else {
            dayCell.textContent = ""
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

    plusDays(delta) {
        // TODO
    }

    plusMonths(delta) {
        let yearDelta = Math.trunc(delta / 12)
        let monthDelta = delta

        let newYear = this._year + yearDelta
        let newMonth = this._month + monthDelta

        return this._dateWithFittedDay(newYear, newMonth, this._day)
    }

    plusYears(delta) {
        return this._dateWithFittedDay(this._year + delta, this._month, this._day)
    }

    _dateWithFittedDay(newYear, newMonth, newDay) {
        let daysInNewMonth = LocalDate.daysInMonth(newYear, newMonth)
        if (newDay > daysInNewMonth) {
            newDay = daysInNewMonth
        }

        return new LocalDate(newYear, newMonth, newDay)
    }

    get weekday() {
        // TODO replace
        return new Date(this._year, this._month - 1, this.day).getDay() + 1;
    }

    static now() {
        let dateTime = new Date()
        let result = new LocalDate(dateTime.getFullYear(), dateTime.getMonth() + 1, dateTime.getDate())
        console.log(JSON.stringify(result))
        return result;
    }

    static daysInMonth(year, month) {
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
                return LocalDate.isLeapYear(year) ? 29 : 28
            case 4:
            case 6:
            case 9:
            case 11:
                return 30
        }
    }

    static isLeapYear(year) {
        if (year % 400 === 0) {
            return true
        } else if (year % 4 === 0) {
            return year % 100 !== 0
        } else {
            return false
        }
    }

    _check() {
        this._checkArguments();
        this._checkYear();
        this._checkMonth();
        this._checkDay();
    }

    _checkArguments() {
        this._checkDefined(this._year, "year")
        this._checkDefined(this._month, "month")
        this._checkDefined(this._day, "day")
    }

    _checkYear() {
        this._checkIsInteger(this._year, "year")
    }

    _checkMonth() {
        this._checkIsInteger(this._month, "month")
        this._checkPositive(this._month, "month")
        this._checkMaximum(12, this._month, "month")
    }

    _checkDay() {
        this._checkIsInteger(this._day, "day")
        this._checkPositive(this._day, "day")
        this._checkMaximum(LocalDate.daysInMonth(this._year, this._month), this._day, "day")
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
