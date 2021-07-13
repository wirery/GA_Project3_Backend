const express = require('express')
const coins = express.Router()
const Coin = require('../models/coins.js')

//Create Route
coins.post('/', async (req, res) => {
    console.log(req.body)
    Coin.create(req.body, (error, createdCoin) => {
      if (error) {
        res.status(400).json({ error: error.message })
      }
      res.status(200).send(createdCoin) //  .json() will send proper headers in response so client knows it's json coming back
    })
  })

  //Index Route
coins.get('/', (req, res) => {
    Coin.find({}, (err, foundCoins) => {
      if (err) {
        res.status(400).json({ error: err.message })
      }
      res.status(200).json(foundCoins)
    })
  })
  //Delete Route
  coins.delete('/:id', (req, res) => {
    Coin.findByIdAndRemove(req.params.id, (err, deletedCoin) => {
      if (err) {
        res.status(400).json({ error: err.message })
      }
      res.status(200).json({'delete_coin':deletedCoin})
    })
  })




//Update Route
coins.put('/:id', (req, res) => {
  console.log(req.params.id)
    Coin.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedCoin) => {
      if (err) {
        res.status(400).json({ error: err.message })
      }
      res.status(200).json(updatedCoin)
    })
  })
  
module.exports = coins
