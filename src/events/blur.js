import { Form, Inputs } from "../htmlEls.js"
import { paintItBlue, paintItRed } from "../paintings.js"

Inputs.forEach(input => input.onblur = function() {
    const label = Form.querySelector(`[for="${this.id}"]`)

    if (!input.value) paintItRed(input, label)
    else if (input.style.color == 'black'
    ) paintItBlue(input, label) 
})