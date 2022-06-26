const express = require('express')
const apiHelper = require('./apiHelper')

const router = express.Router()

router.use(apiHelper.terminalLogger)

// GET /api/v1/todos
router.get('/', (req, res) => {
  try {
    res.json({ statement: 'Welcome to external APIs!' })
  } catch (err) {
    res.status(500).send(err.message)
  }
})

router.use(apiHelper.unknownEndpoint)

module.exports = router
