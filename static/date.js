class DatePickerExample {
    init() {
        this.initList()
    }

    initList() {
        this.datePicker = new DatePicker()
        this.contentDiv().appendChild(this.datePicker.mainElement)
    }

    contentDiv() {
        return document.getElementById('content')
    }
}

window.onload = () => new DatePickerExample().init()
