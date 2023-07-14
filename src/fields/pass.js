import { passField } from "../htmlEls.js"
import { paintItGray, paintItRed } from "../paintings.js" 

const passInput = passField.input
const label = passField.label

passInput.onkeydown = function(e) {
    if (e.key == ' ') e.preventDefault()
}

passInput.onkeyup = function() {
    paintItRed(this, label)

    // if empty, change label and reject
    if (!this.value.length) return label.innerText 
    = this.placeholder + ' cannot be empty'

    // MUST HAVE AT LEAST x CHARACTERES
    const okishPw = this.value.length > 3 || !this.value.length
    okishPw ? paintItGray(this, label) : paintItRed(this, label)

    label.innerText = 'Password must have at least 4 characters'

    // including 1 special charecter, 
    // 1 uppercase letter and 1 number'
}

passInput.oninput = function(e) {
    if (e.inputType != 'insertFromPaste') return 

    return this.value = this.value
    .replace(/ +/g, '').trim()
}