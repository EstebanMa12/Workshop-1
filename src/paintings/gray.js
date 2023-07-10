// PINTAR GRIS
import { black, red } from './utilities.js'

export function paintItGray(input, label) {
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