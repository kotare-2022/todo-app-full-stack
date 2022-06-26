const express = require('express')
const apiHelper = require('./apiHelper')
const db = require('../db/db')

const router = express.Router()

// GET /api/v1/todos
router.get('/', async (req, res, next) => {
  try {
    const data = await db.getFullTodos()
    res.status(200).json(data)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const data = await db.getFullTodoById(id)
    if (!data) {
      // 404 not found
      res.status(404).json({message: 'not found'})
    }
    
    res.status(200).json(data)
  } catch (err) {
    next(err)
  }
})

module.exports = router
