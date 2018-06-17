
class MonthView {
    constructor(date) {
        if (date === undefined) {
            throw "Undefined argument: date"
        }
        this._monthModel = new MonthModel(date)

        this._showWeekNumbers = false
        this._dataRows = 6
        this._dataColumns = 7
        this._weekDayCells = Array(this._dataColumns)
        this._weekNumberCells = Array(this._dataRows)
        this._dayCells = Array(this._dataRows * this._dataColumns)

        this._createView()

        this._fillData()
    }

    set date(date) {
        this._monthModel = new MonthModel(date)
        this._fillData()
    }

    _createView() {
        this._createMainElement()
        this._createTable()
    }

    _createMainElement() {
        this.mainElement = document.createElement('div')
    }

    _createTable() {
        this._table = document.createElement('table')
        this._table.style.margin = 'auto'
        this._table.style.width = '100%'
        this._table.style.tableLayout = 'fixed'
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
        if (this._showWeekNumbers) {
            row.appendChild(document.createElement('th'))
        }
        for (let index = 0; index < this._dataColumns; ++index) {
            row.appendChild(this._createTableHeaderCell(index))
        }
        this._table.appendChild(row)
    }

    _createTableHeaderCell(index) {
        let cell = document.createElement('th')
        this._weekDayCells[index] = cell
        this._layout(cell)
        this._pad(cell)
        this._color(cell)
        return cell
    }

    _createWeekNumberCell(index) {
        let cell = document.createElement('th')
        this._weekNumberCells[index] = cell
        this._layout(cell)
        this._pad(cell)
        this._color(cell)
        return cell
    }

    _createDataRow(index) {
        let row = document.createElement('tr')
        if (this._showWeekNumbers) {
            row.appendChild(this._createWeekNumberCell(index))
        }
        this._addDayCells(row, index)
        this._table.appendChild(row)
    }

    _addDayCells(row, rowIndex) {
        for (let columnIndex = 0; columnIndex < this._dataColumns; ++columnIndex) {
            let cell = this._createDayCell(this._cellIndex(rowIndex, columnIndex))
            row.appendChild(cell)
        }
    }

    _createDayCell(index) {
        let cell = document.createElement('td')
        this._dayCells[index] = cell
        this._layout(cell)
        this._pad(cell)
        return cell
    }

    _layout(cell) {
        cell.style.textAlign = 'right'
    }

    _pad(cell) {
        cell.style.padding = '5px'
    }

    _color(cell) {
        cell.style.color = '#369'
    }

    _fillData() {
        this._fillWeekDayNames()
        this._fillWeekNumbersIfShown()
        this._fillDays()
    }

    _fillWeekDayNames() {
        for (let [index, cell] of this._weekDayCells.entries()) {
            // TODO localize
            cell.textContent = this._monthModel.weekDay(index)
        }
    }

    _fillWeekNumbersIfShown() {
        if (this._showWeekNumbers) {
            this._fillWeekNumbers()
        }
    }
    _fillWeekNumbers() {
        for (let [index, cell] of this._weekNumberCells.entries()) {
            cell.textContent = this._monthModel.weekNumber(index)
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
        let dayCell = this._dayCell(rowIndex, columnIndex)
        let day = this._monthModel.dayNumber(rowIndex, columnIndex)
        if (day !== null) {
            dayCell.textContent = day
        } else {
            dayCell.textContent = "\u00a0"
        }
    }

    _dayCell(rowIndex, columnIndex) {
        return this._dayCells[this._cellIndex(rowIndex, columnIndex)]
    }

    _cellIndex(rowIndex, columnIndex) {
        return this._dataColumns * rowIndex + columnIndex
    }
}
