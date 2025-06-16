const dotenv = require('dotenv')
dotenv.config() // secure the port or api_key 

const express = require('express') // handle api between frontend and backend 
const cors = require('cors') 
const app = express()
const connectToDb = require('./db/db')
const userRoutes = require('./routes/user.routes')

connectToDb()

app.use(cors()) // accept requests from specific domains only 
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/' , (req,res) => {
    res.send('Hello World')
})

app.use('/users' , userRoutes)


module.exports = app