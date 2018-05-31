class Books {
    init_list() {
        this.div = document.getElementById('book_list')
        this.div.appendChild(document.createTextNode('TODO request book list from api'))
        this.fetch_book_list()
    }

    fetch_book_list() {
        let request = new XMLHttpRequest()
        request.onreadystatechange = () => this.handle_state_change(request)
        request.open('GET', '/api/book_list')
        request.send()
    }

    /**
     * @param {XMLHttpRequest} request
     */
    handle_state_change(request) {
        if (request.readyState === 4 && request.status === 200) {
            this.handle_response_text(request.responseText)
        }
    }

    handle_response_text(responseText) {
        let lines = responseText
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0)
        for (let line of lines) {
            this.div.appendChild(document.createElement('br'))
            this.div.appendChild(document.createTextNode('[' + line + ']'))
        }
    }
}

window.onload = () => new Books().init_list()
