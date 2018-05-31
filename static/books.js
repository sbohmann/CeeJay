class Books {
    initList() {
        this.div = document.getElementById('book_list')
        this.div.appendChild(document.createTextNode('TODO request book list from api'))
        this.fetchBookList()
    }

    fetchBookList() {
        let request = new XMLHttpRequest()
        request.onreadystatechange = () => this.handleStateChange(request)
        request.open('GET', '/api/book_list')
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
        let lines = responseText
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0)
        for (let line of lines) {
            this.div.appendChild(this.createBookEntry())
        }
    }

    createBookEntry() {
        let result = document.createElement('div');
        result.classList.add('list_entry')
        return result;
    }
}

window.onload = () => new Books().initList()
