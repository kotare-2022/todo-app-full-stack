const express = require('express')
const apiHelper = require('./apiHelper')
const db = require('../db/db')

const router = express.Router()

router.use(apiHelper.terminalLogger)

// GET /api/v1/todos
router.get('/', async (req, res) => {
  try {
    const data = await db.getFullTodos()
    res.status(200).json(data)
  } catch (err) {
    // consider a logger
    res.status(500).json({message: err.message})
    // throw err
  }
})

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const data = await db.getFullTodoById(id)
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json({message: err.message})
  }
})

router.use(apiHelper.unknownEndpoint)

module.exports = router
