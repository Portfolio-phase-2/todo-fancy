const express = require('express')
const router = express.Router()
const task = require('./taskRoute')

router.use('/tasks', task)

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Halo Asrul H')
})

module.exports = router
