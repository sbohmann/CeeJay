
class MonthView {
    constructor(date) {
        if (date === undefined) {
            throw "Undefined argument: date"
        }
        this._monthModel = new MonthModel(date)

        this._dataRows = 6
        this._dataColumns = 7
        this._weekDayCells = Array(this._dataColumns)
        this._weekNumberCells = Array(this._dataRows)
        this._dayCells = Array(this._dataRows * this._dataColumns)

        this._createMainElement()

        this._fillData()
    }

    set date(date) {
        this._monthModel = new MonthModel(date)
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
            let cell = this._createDayCell(this._cellIndex(rowIndex, columnIndex))
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
            cell.textContent = this._monthModel.weekDay(index)
        }
    }

    _fillWeekNumbers() {
        for (let [index, cell] of this._weekNumberCells.entries()) {
            // TODO localize using a week day rule
            cell.textContent = '# ' + this._monthModel.weekNumber(index)
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
            dayCell.textContent = ""
        }
    }

    _dayCell(rowIndex, columnIndex) {
        return this._dayCells[this._cellIndex(rowIndex, columnIndex)]
    }

    _cellIndex(rowIndex, columnIndex) {
        return this._dataColumns * rowIndex + columnIndex
    }
}
