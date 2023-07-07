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

    fields.forEach(field => {
        if (!field.input.value) return field
        .label.style.display = 'inline'
        
        return field.label.style.display = 'none'
    })
}