class BookEntry {
    constructor(book) {
        this.book = book
        this.bookDiv = document.createElement('div')
        this.bookDiv.classList.add('list_entry')
        this.fillContent(this.bookDiv, book);
    }

    fillContent() {
        this.appendParagraph(this.header(this.bookLink()))
        this.appendParagraph(this.textNode(this.book.author.displayName))
        this.appendParagraph(this.textNode(this.book.year))
        for (let image of this.book.images) {
            this.appendParagraph(this.createBookImage(image).mainElement)
        }
    }

    textNode(value) {
        return document.createTextNode(value);
    }

    appendParagraph(content) {
        let p = document.createElement('p')
        p.appendChild(content)
        this.bookDiv.appendChild(p)
    }

    header(content) {
        let result = document.createElement('h2')
        result.appendChild(content)
        return result
    }

    bookLink() {
        let result = document.createElement('a')
        result.setAttribute('href', '/book/' + this.book.id)
        result.appendChild(document.createTextNode(this.book.name))
        return result
    }

    createBookImage(image) {
        let result = new ImageView(image.path)
        result.setWidth(480)
        result.setHeight(480)
        return result
    }
}
