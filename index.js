const express = require('express')
const app = express()


let persons = [
    {
        name: "Arto Kutvas",
        number: "040-123456", 
        id: 1
    },
    {
        name: "Martti Tienari",
        number: "040-123456", 
        id: 2
    },
    {
        name: "Arto Jarvinen",
        number: "040-123456", 
        id: 3
    },
    {
        name: "Lea Kutvonen",
        number: "040-123456", 
        id: 4
    }
]

app.get('/', (req, res) =>{
    res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) =>{
    res.json(persons)
})

const PORT = 3001
app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`)
})