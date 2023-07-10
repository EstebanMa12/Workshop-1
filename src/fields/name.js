import { nameField } from "../htmlEls.js"
import { paintItGray, paintItRed } from "../paintings.js" 

const nameFields = Object.values(nameField)

nameFields.forEach(field => { 
    const nameInputs = field.input
    
    nameInputs.onkeydown = function(e) {
        // if key == specialKey || letter, allow
        const specialKeys = e.key == 'Backspace'  
        || e.key == ' ' || e.key == 'Tab' || e.key == 'Enter'
        
        const twoSpaces = e.key == ' ' && nameInputs.value.at(-1) == ' ' 
        
        const exceptions = specialKeys
        || (e.key.match(/[a-zA-Z]/) 
        && e.key.length == 1)

        if (exceptions && !twoSpaces) return 
        e.preventDefault() // else || moreSpaces, block.
    }

    nameInputs.onkeyup = function(e) {
        if (e.key.match(/[A-Za-z]/) && e.key.length > 1 
        && e.key != 'Backspace' && e.key != 'Enter') return
        
        const label = field.label
        
        // if empty, reject and change label
        !this.value.trim() 
        && (e.key.match(/[A-Za-z]/) || e.key == ' ') 
        ? label.innerText = this.placeholder + ' cannot be empty'
        : label.innerText = 'Only letters allowed'
            
        // if space at the begininng, reject
        if (e.key == ' ' && !this.value.trim()) this.value = ''
    
        // if keyup shift after symbol, reject
        if (this.style.color != 'black' && e.key == 'Shift') return 
        
        // ALWAYS PAINT RED UNLESS...
        
        // unless it's a letter
        if (e.key.match(/[A-Za-z]/) && e.key.length == 1
        ) return paintItGray(this, label)
    
        // unless it's a backspace and still got letters
        if (e.key == 'Backspace' && !!this.value
        ) return paintItGray(this, label)
    
        // unless it's a letter before keyup a shift
        if (this.value.at(-1)?.match(/[A-Za-z]/) 
        && e.key == 'Shift') return paintItGray(this, label)
    
        // unless it's a space after letter
        if (this.value.match(/[A-Za-z]/) 
        && e.key == ' ') return paintItGray(this, label)
    
        // BEYOND THERE... ALWAYS PAINT RED
        paintItRed(this, label) // paint red...
    }
    
    nameInputs.oninput = function(e) {
        if (e.inputType != 'insertFromPaste') return 
        
        let curatedInput = this.value
        .replace(/[^a-zA-Z]+/g, ' ')
        .replace(/ +/g, ' ').trim()

        return this.value = curatedInput
    }
})