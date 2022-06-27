const express = require('express')
const db = require('../db/db')

const router = express.Router()

// GET /api/v1/todos
router.get('/', async (req, res, next) => {
  try {
    const data = await db.getFullTodos()
    // console.log(data)
    res.status(200).json(data)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
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

router.post('/', async (req, res, next) => {
  try {
    const data = req.body
    const idAry = await db.addByTableName('todos', data)
    const id = idAry[0]
    // get new information from database based on id
    const result = await db.getFullTodoById(id)
    res.status(200).json(result)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    await db.deleteByTableNameAndId('todos', id)
    res.status(204)//.json({message: 'successfully deleted'})
    // <--- shows no information sent with a 204!
  } catch (err) {
    next(err)
  }
})

module.exports = router
