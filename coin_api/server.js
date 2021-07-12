const express = require('express');
const mongoose = require ('mongoose');
const db = mongoose.connection;
require('dotenv').config()
const cors = require('cors')

const APP = express()
const PORT = process.env.PORT || 3000;


const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/'+ `YOUR DATABASE NAME`;


mongoose.connect(MONGODB_URI ,  { useNewUrlParser: true});

// middleware
APP.use(express.json()); //use .json(), not .urlencoded()

// Error / Disconnection

db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

mongoose.connection.on('error', err => console.log(err.message + ' is Mongod not running?'))
mongoose.connection.on('disconnected', () => console.log('mongo disconnected'))


//Database connection
mongoose.connect('mongodb://localhost:27017/coins', { useNewUrlParser: true })
mongoose.connection.once('open', ()=>{
    console.log('connected to mongoose...')
})

const whitelist = ['http://localhost:3000']
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

APP.use(cors(corsOptions))

//Controllers/Routes
const coinsController = require('./controllers/coins')
APP.use('/coins', coinsController)



APP.listen(PORT, () => {
  console.log('🎉🎊', 'celebrations happening on port', PORT, '🎉🎊',)
})

