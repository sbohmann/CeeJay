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
            this.createBookEntry(book)
        }
    }

    createBookEntry(book) {
        let bookDiv = document.createElement('div')
        bookDiv.classList.add('list_entry')
        bookDiv.appendChild(this.createBookLink(book))
        bookDiv.appendChild(document.createElement('br'))
        bookDiv.appendChild(document.createTextNode(book.author.displayName))
        bookDiv.appendChild(document.createElement('br'))
        bookDiv.appendChild(document.createTextNode(book.year))
        for (let image of book.images) {
            bookDiv.appendChild(document.createElement('br'))
            bookDiv.appendChild(this.createBookImage(image).mainElement)
        }
        this.bookList.addElement(bookDiv)
    }

    createBookLink(book) {
        let result = document.createElement('a')
        result.setAttribute('href', '/book/' + book.id)
        result.appendChild(document.createTextNode(book.name))
        return result
    }

    createBookImage(image) {
        let result = new ImageView(image.path)
        result.setWidth(600)
        result.setHeight(600)
        return result
    }
}

window.onload = () => new Books().initList()
