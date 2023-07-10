// FORM
const form = document.querySelector('form')

// INPUTS
const [ i_fn, i_sn, i_em, i_pw ] = form.querySelectorAll('input') 
const inputs = [ i_fn, i_sn, i_em, i_pw ]

// LABELS
const [ l_fn, l_sn, l_em, l_pw ] = form.querySelectorAll('label')
const labels = [ l_fn, l_sn, l_em, l_pw ]

// INPUTS && LABELS 
const fields = inputs.map((input, index) => { 
    return { input: input, label: labels[index] }
})

const nameFields = [fields[0], fields[1]]
const emailField = fields[2]
const passField = fields[3];

// INPUTS EVENTS

// [FIRST && LAST NAMES]
[ i_fn, i_sn ].forEach(input => input.onkeydown = function(e) {
    // if key == backspace || space || letter, allow
    const specialKeys = e.key == 'Backspace'  
    || e.key == ' ' || e.key == 'Tab' || e.key == 'Enter'
    
    const twoSpaces = e.key == ' ' && input.value.at(-1) == ' ' 
    
    const exceptions = specialKeys
    || (e.key.match(/[a-zA-Z]/) 
    && e.key.length == 1)

    if (exceptions && !twoSpaces) return 
    e.preventDefault() // else || moreSpaces, block.
});

[ i_fn, i_sn ].forEach(input => input.onkeyup = function(e) {
    if (e.key.match(/[A-Za-z]/) && e.key.length > 1 && e.key != 'Backspace' && e.key != 'Enter') return
    
    const label = form.querySelector(`[for="${input.id}"]`)
    
    // if empty, reject and change label
    !input.value.trim() 
    && (e.key.match(/[A-Za-z]/) || e.key == ' ') 
    ? label.innerHTML = input.placeholder + ' cannot be empty'
    : label.innerHTML = 'Only letters allowed'
        
    // if space at the begininng, reject
    if (e.key == ' ' && !input.value.trim()) input.value = ''

    // if keyup shift after symbol, reject
    if (input.style.color != 'black' && e.key == 'Shift') return 
    
    // ALWAYS PAINT RED UNLESS...
    
    // unless it's a letter
    if (e.key.match(/[A-Za-z]/) && e.key.length == 1) return stripPaint(input, label)

    // unless it's a backspace and still got letters
    if (e.key == 'Backspace' && !!input.value) return stripPaint(input, label)

    // unless it's a letter before keyup a shift
    if (input.value.at(-1)?.match(/[A-Za-z]/) && e.key == 'Shift') return stripPaint(input, label)

    // unless it's a space after letter
    if (input.value.match(/[A-Za-z]/) && e.key == ' ') return stripPaint(input, label)

    // BEYOND THERE... ALWAYS PAINT RED
    paintFields(input, label) // paint red...
})

// [EMAIL]
i_em.onkeydown = function(e) {
    const space = e.key == ' ', at = e.key == '@'
    const symbol = e.key?.match(/[^@a-zA-Z0-9.]+/)
    const multipleAts = this.value.includes('@') && at 

    if (space || symbol || multipleAts) e.preventDefault() 
}

i_em.onkeyup = function(e) { 
    const label = form.querySelector(`[for="${this.id}"]`)
    if (!this.value.length) return paintFields(this, label, true)

    // Paint until all requirements are met
    paintFields(this, label)

    // RESTRICTIONS
    const regEx_letters = /[a-zA-Z]/

    const pointsAround = this.value.at(0) == '.'

    const lettersBeforeAt = this.value.includes('@')
    ? regEx_letters.test(this.value.substring(0, this.value.indexOf('@')))
    : regEx_letters.test(this.value)

    const lettersAfterAt = this.value.includes('@') 
    ? regEx_letters.test(this.value.slice(this.value.indexOf('@'))) : false
    
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
    : stripPaint(this, label)
}

// [PASSWORD]
// pass must receive at least 3 characters
i_pw.onkeydown = function(e) {
    if (e.key == ' ') e.preventDefault()
}

i_pw.onkeyup = function() {
    const label = form.querySelector(`[for="${this.id}"]`)
    const okishPw = i_pw.value.length > 3 || !i_pw.value.length

    // EMPTY
    if (!this.value.length) return paintFields(this, label, true)

    // MUST HAVE AT LEAST 
    okishPw ? stripPaint(this, label) : paintFields(this, label)

    l_pw.innerText = 'Password must have at least 4 characters'
    // , including 1 special charecter, 1 uppercase letter and 1 number'
}

// [BLUR INPUTS]
inputs.forEach(input => input.onblur = function() {
    const label = form.querySelector(`[for="${this.id}"]`)

    if (!input.value) paintFields(input, label)
    else if (input.style.color == 'black') validateInput(input, label) 
})

// [SUBMIT FORM]
const users = JSON.parse(localStorage.getItem('BootCamp Users')) || []
form.onsubmit = e => {
    e.preventDefault()
    const label = input => form.querySelector(
        `[for="${input.id}"]`
    )
    
    inputs.filter(input => input.style.color == '' )
    .forEach(input => paintFields(input, label(input), true))

    const isValidated = input => input
    .style.color == 'rgb(13, 110, 253)' 

    inputs.every(input => isValidated(input))
    ? register() : fixInput()

    function register() {
        const keys = ['name', 'last', 'mail', 'pass']  
        const values = inputs.map(input => input.value)
        
        let user = {}; 
        keys.forEach((key, i) => user[key] = values[i] )
        users.push(user)
        
        localStorage.setItem(
            'BootCamp Users', 
            JSON.stringify(users)
        )
        
        console.log(user.name, user.last, 'registered!')
    }

    function fixInput() {
        const formerError = inputs
        .find(input => input.style.color.includes('rgb(255'))

        formerError.focus()
    }
}
// [PAINTING FUNCTIONS]

// DYNAMIC RED COLOR ON FIELDS
const black = input => `#${input.id}::placeholder { color: rgb(117, 117, 117); } `
const red = input => `#${input.id}::placeholder { color: rgb(255, 122, 122); } `
const blue = input => `#${input.id}::placeholder { color: #0d6efd; } `

// DESPINTAR
function stripPaint(input, label) {
    // Label styles
    label.style.display = 'none' 

    // Input styles
    input.style = "color: black;\
    border-color: #dcdcdc;"

    // Input's placeholder styles
    const invalid = document.querySelector(`#redCanvas`)
    if (!!invalid) invalid.innerHTML = 
    invalid.innerHTML.includes(input.id) 
    ? invalid?.innerHTML?.replaceAll(red(input), black(input))
    : invalid?.innerHTML
}

// PINTAR ROJO
function paintFields(input, label, def) {
    // Label styles
    label.style.display = 'inline'
    if (def) label.innerHTML = input
    .placeholder + ' cannot be empty'

    // Input styles
    input.style = "color: rgb(255, 122, 122);\
    border-color: rgb(255, 122, 122);"

    // Input's placeholder styles
    let styleEl = document.querySelector('#redCanvas') 

    if (!styleEl) {
        styleEl = document.createElement('style')
        styleEl.setAttribute('id', 'redCanvas')
        document.head.appendChild(styleEl)
    }

    styleEl.innerHTML = 
    styleEl.innerHTML.includes(input.id)
    ? styleEl.innerHTML.includes(black(input))
        ? styleEl.innerHTML.replaceAll(black(input), red(input))
        : styleEl.innerHTML.replaceAll(blue(input), red(input))
    : styleEl.innerHTML += red(input)

}

// PINTAR AZUL
function validateInput(input, label) {
    // Label styles
    label.style.display = 'none'

    // Input styles
    input.style = "color: #0d6efd;\
    border-color: #0d6efd;"

    // Input's placeholder styles
    let styleEl = document.querySelector('#redCanvas') 

    if (!styleEl) {
        styleEl = document.createElement('style')
        styleEl.setAttribute('id', 'redCanvas')
        document.head.appendChild(styleEl)
    }

    styleEl.innerHTML = 
    styleEl.innerHTML.includes(input.id)
    ? styleEl.innerHTML.replaceAll(black(input), blue(input))
    : styleEl.innerHTML += blue(input)
}

// // for testing
// function x() {
//     inputs.forEach(input => input
//     .style.color = 'rgb(13, 110, 253)')
// }; x()