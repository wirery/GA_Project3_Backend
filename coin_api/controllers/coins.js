const express = require('express')
const coins = express.Router()
const Coin = require('../models/coins.js')

//Create Route
coins.post('/', async (req, res) => {
    Coin.create(req.body, (error, createdCoin) => {
      if (error) {
        res.status(400).json({ error: error.message })
      }
      res.status(200).send(createdCoin) //  .json() will send proper headers in response so client knows it's json coming back
    })
  })

  //Index Route
coins.get('/', (req, res) => {
    Bookmark.find({}, (err, foundCoins) => {
      if (err) {
        res.status(400).json({ error: err.message })
      }
      res.status(200).json(foundCoins)
    })
  })
