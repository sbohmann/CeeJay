
class MonthModel {
    constructor(date) {
        if (date === undefined) {
            throw "Undefined argument: date"
        }
        this._date = date

        this._dataRows = 6
        this._dataColumns = 7

        this._dayShift = 0

        this._initData()
    }

    weekDay(index) {
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

    weekNumber(index) {
        // TODO for realz
        return index + 1
    }

    dayNumber(rowIndex, columnIndex) {
        let dayIndex = this._calculateDayIndex(rowIndex, columnIndex)
        if (dayIndex >= this._firstDayIndex && dayIndex <= this._lastDayIndex) {
            return dayIndex - this._firstDayIndex + 1
        } else {
            return null
        }
    }

    _initData() {
        let firstWeekDay = new LocalDate(this._date.year, this._date.month, 1).weekday
        this._firstDayIndex = firstWeekDay - 1
        let daysInMonth = LocalDate.daysInMonth(this._date.year, this._date.month)
        this._lastDayIndex = this._firstDayIndex + daysInMonth - 1
    }

    _rolledDayIndex(index) {
        return index + this._dayShift
    }

    _calculateDayIndex(rowIndex, columnIndex) {
        return rowIndex * this._dataColumns + columnIndex
    }
}
