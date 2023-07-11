// DYNAMIC RED COLOR ON FIELDS
const black = input => `#${input.id}::placeholder { color: rgb(117, 117, 117); } `
const red = input => `#${input.id}::placeholder { color: rgb(255, 122, 122); } `
const blue = input => `#${input.id}::placeholder { color: #0d6efd; } `

export { black, red, blue }