const express = require('express')
const cors = require('cors')
const { cats, dogs, both } = require('../pets/pets.router')

const Queue = require('../queue/Queue')


const q = new Queue;
q.enqueue(1)
q.enqueue(2)
q.enqueue(3)
q.show()

const app = express()

app.use(cors())

app.use('/people', require('../people/people.router'))
app.use('/pets', both)
app.use('/api/cats', cats)
app.use('/api/dogs', dogs)


app.get('/', (req, res) => {
    res.send('Hello Petful!')
})

module.exports = app
