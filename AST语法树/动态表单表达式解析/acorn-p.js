let acorn = require('acorn')
console.log(acorn.parse(`'abc'.initValue`, { ecmaVersion: 2020 }))
