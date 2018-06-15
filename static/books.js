class Books {
    init() {
        this.initList()
    }

    initList() {
        this.datePicker = new ListView()
        this.contentDiv().appendChild(this.datePicker.mainElement)
        this.fetchBookList()
    }

    contentDiv() {
        return document.getElementById('content')
    }

    fetchBookList() {
        let request = new XMLHttpRequest()
        request.onreadystatechange = () => this.handleStateChange(request)
        request.open('GET', '/books')
        request.send()
    }

    /**
     * @param {XMLHttpRequest} request
     */
    handleStateChange(request) {
        if (request.readyState === 4 && request.status === 200) {
            this.handleResponseText(request.responseText)
        }
    }

    handleResponseText(responseText) {
        this.books = JSON.parse(responseText)
        this.createBookList()
    }

    createBookList() {
        for (let book of this.books) {
            let entry = new BookEntry(book)
            this.datePicker.addElement(entry.bookDiv)
        }
    }
}

window.onload = () => new Books().init()
