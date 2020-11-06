const express = require('express')
const json = require('body-parser').json()

const Pets = require('./pets.service')

const both = express.Router()
const cats = express.Router()
const dogs = express.Router()

cats
  .get('/', (req, res) => {
    return res
      .status(200)
      .json(Pets.cats())
  })

dogs
  .get('/', (req, res) => {
    return res
      .status(200)
      .json(Pets.dogs())
  })

both
  .route('/')

  .get((req, res) => {
    let pets = Pets.get()

    return res
      .status(200)
      .json(pets)
  })

  .delete(json, (req, res) => {
    const { type } = req.body;
    console.log(type)

    if (type === 'cat' || 'dog') {
      Pets.dequeue(type)

      return res
        .status(204)
        .send(`${type} was deleted`)

    }
    return res
      .status(400)
      .send('Invalid type')
  })

module.exports = {
  both,
  cats,
  dogs
}