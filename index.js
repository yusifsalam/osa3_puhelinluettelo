const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')


app.use(express.static('build'))
app.use(cors())
app.use(bodyParser.json())

morgan.token('person', function (req, res) {return JSON.stringify(req.body)})

app.use(morgan(function(tokens, req, res){
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.person(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ].join(' ')
}))

app.get('/api/persons', (req, res) => {
  Person
    .find({})
    .then(persons => {
      res.json(persons.map(Person.format))})
    .catch(error => {console.log(error)})
})

app.get('/api/persons/:id', (req, res) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(Person.format(person))
      }
      else {
        res.status(404).end()
      }
    })
    .catch(error => {
      console.log(error)
      res.status(400).send({ error: 'malformatted id' })
    })
})

app.delete('/api/persons/:id', (req, res) => {
  Person
    .findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => {
      console.log(error)
      res.status(400).send({ erorr:'malformatted id' })
    })
})

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (body.name === undefined) {
    return res.status(400).json({ error: 'name must be unique' })
  }

  if (body.number === undefined) {
    return res.status(400).json({ error: 'number must be unique' })
  }

  Person
    .find({ name: body.name })
    .then(person => {
      if (person.length > 0) {
        return res.status(400).json({ error: 'person already added' })
      }
      else{
        const person = new Person({
          name: body.name,
          number: body.number,
        })
        person
          .save()
          .then(Person.format)
          .then(formattedPerson => {
            res.json(formattedPerson)
          })

      }
    })
})

app.put('/api/persons/:id', (req, res) => {
  const body = req.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person
    .findByIdAndUpdate(req.params.id, person, { new : true })
    .then(updatedPerson => {
      res.json(Person.format(updatedPerson))
    })
    .catch(error => {
      console.log(error)
      res.status(400).send({ error: 'malformatted id' })
    })
})

app.get('/info', (req, res) => {
  const persons = Person.find({}).then(persons => {persons.map(Person.format)})
  console.log(persons)
  Person
    .find({})
    .then(persons => {
      persons.map(Person.format)
      res.send(`<p>puhelinluettelossa ${persons.length} henkilön tiedot</p>
            <p>${new Date()}</p>`)
    })

})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})