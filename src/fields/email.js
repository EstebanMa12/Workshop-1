import { emailField } from "../htmlEls.js"
import { paintItGray, paintItRed } from "../paintings.js" 

const emailInput = emailField.input
const label = emailField.label

emailInput.onkeydown = function(e) {
    const space = e.key == ' ', at = e.key == '@'
    const symbol = e.key?.match(/[^a-zA-Z0-9@.\-_]+/)
    const multipleAts = this.value.includes('@') && at 

    if (space || symbol || multipleAts) e.preventDefault() 
}

emailInput.onkeyup = function(e) { 
    // if tabbed into email, not reject
    if (e.key == 'Tab') return

    // Paint until all requirements are met
    paintItRed(this, label)

    // if empty, change label and reject
    if (!this.value.length) return label.innerText 
    = this.placeholder + ' cannot be empty'


    // RESTRICTIONS
    const regEx_letters = /[a-zA-Z]/

    const pointsAround = this.value.at(0) == '.'

    const lettersBeforeAt = this.value.includes('@')
    ? regEx_letters.test(this.value.substring(0, this.value.indexOf('@')))
    : regEx_letters.test(this.value)

    const lettersAfterAt = this.value.includes('@') 
    ? this.value.slice(this.value.indexOf('@')).includes('.')
        ? regEx_letters.test(this.value.slice(this.value.indexOf('@'), this.value.lastIndexOf('.')))
        : regEx_letters.test(this.value.slice(this.value.indexOf('@'))) 
    : false
    console.log(this.value.slice(this.value.indexOf('@')));
    
    const includesPoint = lettersAfterAt 
    ? this.value.includes('.') : false

    const includesCom = regEx_letters.test(this.value.at(-1))

    // ERRORS TO SHOWCASE
    const error = {
        '.@': 'Please enter a part before "@"',
        '@': 'Please include an "@"',
        '@.': 'Please enter a part following "@" and before "."',
        '.': 'Please include a "." after "@" and before "com"',
        'com': 'Please include a valid termination for your email',
        '.!': '"." is being used at a bad position'
    }

    pointsAround ? label.innerHTML = error['.!']
    : !lettersBeforeAt ? label.innerHTML = error['.@']
    : !this.value.includes('@') ? label.innerHTML = error['@']
    : !lettersAfterAt ? label.innerHTML = error['@.']
    : !includesPoint ? label.innerHTML = error['.']
    : !includesCom ? label.innerHTML = error['com'] 
    : paintItGray(this, label)
}

emailInput.oninput = function(e) {
    if (e.inputType != 'insertFromPaste') return 

    let curatedInput = this.value
    .replace(/[^\w@.-]+/g, '').trim()

    return this.value = curatedInput
}