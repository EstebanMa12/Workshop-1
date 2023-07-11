import { Form, Inputs, congratulations, failure } from "../htmlEls.js"
import { paintItRed } from "../paintings.js"
import confetti from 'https://cdn.skypack.dev/canvas-confetti'

const Users = JSON.parse(localStorage.getItem('BootCamp Users')) || []

Form.onsubmit = e => {
    e.preventDefault()
    
    const label = input => Form.querySelector(
        `[for="${input.id}"]`
    )
    
    Inputs.filter(input => input.style.color == '' )
    .forEach(input => paintItRed(input, label(input), true))

    const isValidated = input => input
    .style.color == 'rgb(13, 110, 253)' 

    Inputs.every(input => isValidated(input))
    ? register() : fixInput()

    function register() {
        // Play music
        document.querySelector('#yay').play()

        const keys = ['name', 'last', 'mail', 'pass']  
        const values = Inputs.map(input => input.value)

        let user = {} 
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
        }
        
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
        const formerError = Inputs.find(input => 
            input.style.color.includes('rgb(255')
        )
        
        if (formerError) formerError.focus()
    }
}