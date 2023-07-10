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


export { 
    Form, Inputs, Labels, 
    nameField, emailField, passField 
}