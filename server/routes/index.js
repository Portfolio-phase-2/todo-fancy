const express = require('express')
const router = express.Router()
const { signup, signin } = require('../controllers/userController') 
const task = require('./taskRoute')

router.post('/signup', signup)
router.post('/signin', signin)

router.use('/tasks', task)

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Halo Asrul H')
})

module.exports = router