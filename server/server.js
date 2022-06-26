const path = require('path')
const express = require('express')

const apiHelper = require('./routes/apiHelper')
const todos = require('./routes/todos')
const themes = require('./routes/themes')
const importance_levels = require('./routes/importance_levels')

const server = express()

server.use(express.json())
server.use(express.static(path.join(__dirname, './public')))

server.use('/api/v1/todos', todos)
server.use('/api/v1/themes', themes)
server.use('/api/v1/importance_levels', importance_levels)

// BrowserRouter config
/*
server.get('*', (req, res) => {
  // note the path is not relative to location of server.js file!
  res.sendFile(path.resolve('/server/public/index.html'))
})
*/

server.use(apiHelper.unknownEndpoint)

module.exports = server
