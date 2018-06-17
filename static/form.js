
class FormExample {
    init() {
        this._firstNameInput = this._createTextField("First Name")
        this._initValidation(this._firstNameInput)
        this._lastNameInput = this._createTextField("Last Name")
        this._initValidation(this._lastNameInput)
    }

    _createTextField(labelText) {
        let paragraph = document.createElement('p')
        this._addLabel(labelText, paragraph);
        return this._addTextFieldElement(paragraph);
    }

    _addLabel(labelText, paragraph) {
        if (labelText !== undefined) {
            this._addLabelElement(labelText, paragraph);
        }
    }

    _addLabelElement(labelText, paragraph) {
        let label = document.createElement('label')
        label.textContent = labelText
        paragraph.appendChild(label)
    }

    _addTextFieldElement(paragraph) {
        let result = document.createElement('input')
        result.type = 'text'
        paragraph.appendChild(result)
        this.contentDiv().appendChild(paragraph)
        return result;
    }

    contentDiv() {
        return document.getElementById('content')
    }

    _initValidation(textField) {
        let validator = () => this._validateTextField(textField)
        textField.oninput = validator
        validator()
    }

    _validateTextField(textField) {
        let text = textField.value
        console.log("text: [" + textField.value + "]")
        if (/^\s*$/.test(text)) {
            console.log("empty")
            textField.style.border = '3px #600'
            textField.style.boxShadow = '0 4px 8px 0 #8003, 0 6px 20px 0 #3003'
        } else {
            console.log("nonempty")
            textField.style.border = '3px black'
            textField.style.boxShadow = 'none'
        }
    }
}

window.onload = () => new FormExample().init()
