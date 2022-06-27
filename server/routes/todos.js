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
    const data = req.body // assuming the body of the response is json
    // assume that the information received is camelCased --> will need to be transformed to snake case 

    // then data added ---> this means a second request to the database based on the new id returned

  } catch (err) {

  }
})

module.exports = router
