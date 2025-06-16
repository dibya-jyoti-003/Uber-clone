const dotenv = require('dotenv')
dotenv.config() // secure the port or api_key 

const express = require('express') // handle api between frontend and backend 
const cors = require('cors') 
const app = express()

app.use(cors()) // accept requests from specific domains only 

app.get('/' , (req,res) => {
    res.send('Hello World')
})

module.exports = app