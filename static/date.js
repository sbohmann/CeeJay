class DatePickerExample {
    init() {
        this.initList()
    }

    initList() {
        this.datePicker = new DatePicker()
        //this.datePicker.mainElement.style.fontSize = '8px'
        //this.datePicker.mainElement.style.size = '200px'
        this.contentDiv().appendChild(this.datePicker.mainElement)
    }

    contentDiv() {
        return document.getElementById('content')
    }
}

window.onload = () => new DatePickerExample().init()
