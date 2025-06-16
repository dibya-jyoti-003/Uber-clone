const http = require('http')
const app  = require('./app')

const server = http.createServer(app)
port = process.env.PORT || 3000

server.listen (port)