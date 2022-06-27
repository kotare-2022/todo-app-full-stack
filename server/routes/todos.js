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
    res.status(201).json(result) // use of 201 for creation
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    await db.deleteByTableNameAndId('todos', id)
    res.status(204).json({message: 'successfully deleted'}) // 204 for deletion
    // <--- shows no information sent with a 204!
  } catch (err) {
    next(err)
  }
})

router.patch('/:id', async (req, res, next) => {
  try {
    // the information that is received is expected to have numbers for both 'theme' and 'importanceLevel' 
    const { id } = req.params
    const data = req.body
    await db.updateByTableNameAndId('todos', id, data)
    // return the newly updated information, with a new request from the server getFullTodoById, we are re-querying for any potential changes 
    // we cannot return data for our response as we are servicing a PATCH route. Therefore, the data received may not be complete
    const updatedTodo = await db.getFullTodoById(id)
    res.status(200).json(updatedTodo)
  } catch (e) {
    next(e)
  } 
})

module.exports = router
