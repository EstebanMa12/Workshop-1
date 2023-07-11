// PINTAR ROJO
import { black, blue, red } from './utilities.js'

export function paintItRed(input, label, def) {
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

    // error icon
    input.nextElementSibling.style.display = 'grid'
}