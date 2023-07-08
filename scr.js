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
});

// INPUTS EVENTS

// [FIRST && LAST NAMES]
[ i_fn, i_sn ].forEach(input => input.onkeydown = function(e) {
    const label = form.querySelector(`[for="${input.id}"]`)

    if (e.key.match(/^[A-Za-z\s]+$/)) return stripPaint(input, label)

    label.innerHTML = 'Only letters allowed'
    paintFields(input, label)
    e.preventDefault()
});

[ i_fn, i_sn ].forEach(input => input.onkeyup = function(e) {
    const label = form.querySelector(`[for="${input.id}"]`)

    if (!input.value.trim().length && e.key == ' ') input.value = ''

    if (input.value.trim() && e.key.match(/^[A-Za-z\s]+$/)) return stripPaint(input, label)

    if (!e.key.match(/^[A-Za-z\s]+$/)) label
    .innerHTML = 'Only letters allowed'

    paintFields(input, label, true)
})

// [EMAIL]
i_em.onkeydown = function(e) {
    const space = e.key == ' ', at = e.key == '@'
    const symbol = e.key.match(/[^@a-zA-Z0-9.]+/)
    const multipleAts = this.value.includes('@') && at 

    if (space || symbol || multipleAts) e.preventDefault() 
}

i_em.onkeyup = function(e) { 
    const label = form.querySelector(`[for="${this.id}"]`)
    if (!this.value.length) return paintFields(this, label, true)

    const error = {
        '.@': 'Please enter a part before "@"',
        '@': 'Please include an "@"',
        '@.': 'Please enter a part following "@" and before "."',
        '.': 'Please include a "." after "@" and before "com"',
        'com': 'Please include a termination for your email',
        '.!': '"." is being used at a bad position'
    }

    const lettersBeforeAt = this.value.includes('@')
    ? !!this.value.substring(0, this.value.indexOf('@')).match(/^[a-zA-Z]+$/g)?.length : !!this.value.match(/^[a-zA-Z]+$/g)?.length

    const lettersAfterAt = !!this.value.substring(this.value.indexOf('@')+1, this.value.at(-1)).match(/^[a-zA-Z]+$/g)?.length 

    const includesPoint = lettersAfterAt 
    ? this.value.substring(this.value.indexOf('@') + 1, this.value.at(-1)).includes('.') : false

    const pointsAround = this.value.at(0) == '.' ||
     this.value.at(-1) == '.'

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
}


// [PAINTING FUNCTIONS]

// DYNAMIC RED COLOR ON FIELDS
const black = input => `#${input.id}::placeholder { color: rgb(117, 117, 117); } `
const red = input => `#${input.id}::placeholder { color: rgb(255, 122, 122); } `

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

// PINTAR
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
    ? styleEl.innerHTML.replaceAll(black(input), red(input))
    : styleEl.innerHTML += red(input)

}
