const express = require('express')
const apiHelper = require('./apiHelper')
const db = require('../db/db')

const router = express.Router()

router.use(apiHelper.terminalLogger)

// GET /api/v1/importance_levels
router.get('/', async (req, res) => {
  try {
    const data = await db.getByTableName('importance_levels')
    res.status(200).json(data)
  } catch (err) {
    res.status(500).send({err: message})
  }
})

 // then POST
 // then DELETE

module.exports = router