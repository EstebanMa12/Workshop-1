// PINTAR AZUL
import { black, blue } from './utilities.js'

export function paintItBlue(input, label) {
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