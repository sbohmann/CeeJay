
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

    plusYears(delta) {
        return this._dateWithFittedDay(this._year + delta, this._month, this._day)
    }

    plusMonths(delta) {
        this._checkIsInteger(delta, delta)

        if (delta === 0) {
            return this
        } else if (delta > 0) {
            return this._plusMonths(delta)
        } else if (delta < 0) {
            return this._minusMonths(Math.abs(delta))
        }
    }

    _plusMonths(delta) {
        let rawDeltaMonths = delta + (this._month - 1)
        let deltaMonths = rawDeltaMonths % 12
        let deltaYears = Math.trunc(rawDeltaMonths / 12)
        let newYear = this._year + deltaYears
        let newMonth = 1 + deltaMonths
        return new LocalDate(newYear, newMonth, this._day)
    }

    _minusMonths(delta) {
        let rawDeltaMonths = delta + (12 - this.month)
        let deltaMonths = rawDeltaMonths % 12
        let deltaYears = Math.trunc(rawDeltaMonths / 12)
        let newYear = this._year - deltaYears
        let newMonth = 12 - deltaMonths
        return new LocalDate(newYear, newMonth, this._day)
    }

    plusDays(delta) {
        // TODO convert to epoch days, modify, convert back ^^
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
