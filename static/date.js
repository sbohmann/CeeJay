class DatePickerExample {
    init() {
        this.initList()
    }

    initList() {
        this.datePicker = new DatePicker()
        this.datePicker.mainElement.style.fontSize = '12px'
        this.datePicker.mainElement.style.width = '300px'
        this.datePicker.mainElement.style.boxShadow = '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
        this.contentDiv().appendChild(this.datePicker.mainElement)
    }

    contentDiv() {
        return document.getElementById('content')
    }
}

window.onload = () => new DatePickerExample().init()
