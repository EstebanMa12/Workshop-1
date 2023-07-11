// FORM
const Form = document.querySelector('form')

// INPUTS
const [ i_fn, i_sn, i_em, i_pw ] = Form.querySelectorAll('input') 
const Inputs = [ i_fn, i_sn, i_em, i_pw ]

// LABELS
const [ l_fn, l_sn, l_em, l_pw ] = Form.querySelectorAll('label')
const Labels = [ l_fn, l_sn, l_em, l_pw ]

// INPUTS && LABELS 
const field = Inputs.map((input, index) => { 
    return { input: input, label: Labels[index] }
})

// FIELDS
const nameField = { 'first' : field[0], 'last' : field[1] }
const emailField = field[2]
const passField = field[3]

// CONGRATULATIONS
const congratulations = document
.querySelector('#congratulations')

congratulations.onclick = function() { 
    return this.style.display = 'none'
}

const failure = document.querySelector('#fail')

failure.onclick = function() { 
    this.style.display = 'none'
    return i_em.focus()
}


export { 
    Form, Inputs, Labels, congratulations,
    failure, nameField, emailField, passField 
}