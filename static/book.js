class Book {
    initView() {
        this.title = document.getElementById('book_title')
        this.details = document.getElementById('book_title')
        this.fetchBookDetails()
    }

    fetchBookDetails() {
        let request = new XMLHttpRequest()
        request.onreadystatechange = () => this.handleStateChange(request)
        request.open('GET', '/api/book_details')
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
        this.book = JSON.parse(responseText)
        createBookUi()
    }

    createBookUi() {
        this.title.appendChild(document.createTextNode(book.title))
        this.createBookDetails()
    }

    createBookDetails() {
        this.createAuthor()
    }

    createAuthor() {
        let p = document.createElement('p')
        p.appendChild(document.createTextNode('Author:'))
        p.appendChild(this.createAuthorLink())
        this.details.appendChild(p)
    }

    createAuthorLink() {
        result = document.createElement('a')
        result.setAttribute('href', '/author.html?id=' + this.book.author.id)
        result.appendChild(document.createTextNode(this.book.author.displayName))
        return result
    }
}

window.onload = () => new Book().initView()
