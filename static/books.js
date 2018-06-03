class Books {
    initList() {
        this.bookList = new ListView()
        document.body.appendChild(this.bookList.mainElement)
        this.fetchBookList()
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
            this.bookList.addElement(entry.bookDiv)
        }
    }
}

window.onload = () => new Books().initList()
