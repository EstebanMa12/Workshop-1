// MAIN LOGIC [IDENTIFYING EMPTY FIELDS]

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

// ON SUBMIT EVENT
form.onsubmit = e => {
    e.preventDefault()
    l_pw.innerText = 'Password cannot be empty'

    fields.forEach(field => {
        if (field.input.value.trim()) return stripPaint(field)
        
        return paintFields(field)
    })
}
// END OF MAIN LOGIC

// IMPROVEMENTS

// DYNAMIC RED COLOR ON FIELDS
const black = field => `#${field.input.id}::placeholder { color: rgb(117, 117, 117); } `
const red = field => `#${field.input.id}::placeholder { color: rgb(255, 122, 122); } `

function stripPaint(field) {
    // Label styles
    field.label.style.display = 'none' 

    // Input styles
    field.input.style = "color: black;\
    border-color: #dcdcdc;"

    // Input's placeholder styles
    const invalid = document.querySelector(`#redCanvas`)
    if (!!invalid) invalid.innerHTML = 
    invalid.innerHTML.includes(field.input.id) 
    ? invalid?.innerHTML?.replaceAll(red(field), black(field))
    : invalid?.innerHTML
}

function paintFields(field) {
    // Label styles
    field.label.style.display = 'inline'

    // Input styles
    field.input.style = "color: rgb(255, 122, 122);\
    border-color: rgb(255, 122, 122);"

    // Input's placeholder styles
    let styleEl = document.querySelector('#redCanvas') 

    if (!styleEl) {
        styleEl = document.createElement('style')
        styleEl.setAttribute('id', 'redCanvas')
        document.head.appendChild(styleEl)
    }

    styleEl.innerHTML = 
    styleEl.innerHTML.includes(field.input.id)
    ? styleEl.innerHTML.replaceAll(black(field), red(field))
    : styleEl.innerHTML += red(field)
}

// IMPROVING INPUTS

// first name && last name inputs : they can only receive letters
[ i_fn, i_sn ].forEach(input => input.onkeydown = function(e) {
    if (e.key.match(/^[A-Za-z\s]+$/)) return  
    e.preventDefault()
})

// pass must receive at least 3 characters
i_pw.oninput = () => {
    const okishPw = i_pw.value.length >= 3 || !i_pw.value.length
    if (okishPw) return l_pw.style.display = 'none' 
    l_pw.style.display = 'inline'
    l_pw.innerText = 'Password must have at least 3 characters'
}