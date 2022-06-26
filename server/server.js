const path = require('path')
const express = require('express')

const todos = require('./routes/todos')

const server = express()

server.use(express.json())
server.use(express.static(path.join(__dirname, './public')))

server.use('/api/v1/todos', todos)

module.exports = server
