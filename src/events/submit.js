import { Form, Inputs, congratulations, failure } from "../htmlEls.js"
import { paintItRed } from "../paintings.js"
import confetti from 'https://cdn.skypack.dev/canvas-confetti'

const Users = JSON.parse(localStorage.getItem('BootCamp Users')) || []

Form.onsubmit = e => {
    e.preventDefault()
    
    // Arrow function to get label attached to input
    const label = input => Form.querySelector(
        `[for="${input.id}"]`
    )
    
    // Will paint red empty inputs and reject
    Inputs.filter(input => input.style.color == '' )
    .forEach(input => paintItRed(input, label(input), true))

    // Validate if input is blue
    const isValidated = input => input
    .style.color == 'rgb(13, 110, 253)' 

    // Check with ternary operators if all inputs are blue
    Inputs.every(input => isValidated(input))
    ? register() : fixInput()

    function register() {
        const keys = ['name', 'last', 'mail', 'pass']  
        const values = Inputs.map(input => input.value)

        let user = {} 
        // We get all inputed values in form and store them in a {}
        keys.forEach( (key, i) => user[key] = values[i] )
        
        const userAlreadyExist = Users.some(
            existing => existing.mail == user.mail
        )
        
        // reject user
        if (userAlreadyExist) {
            failure.style.display = 'flex'

            return console.error(
                '[', user.name, 
                user.last, ']', 
                'already exists'
            )    
        };         // Play music
        document.querySelector('#yay').play()
        
        // save user 
        Users.push(user)
        confetti()
        
        localStorage.setItem(
            'BootCamp Users', 
            JSON.stringify(Users)
        )
        
        // DISPLAY SUCESS
        console.log('[', user.name, user.last, ']', 'registered!')
        congratulations.style.display = 'flex'
    }

    function fixInput() {
        // selects the input that causes the conflict
        // since it's not valid yet
        const formerError = Inputs.find(input => 
            input.style.color.includes('rgb(255')
        )
        
        if (formerError) formerError.focus()
    }
}