const express = require('express')
const router = express.Router()
const { signup, signin } = require('../controllers/userController') 
const { facebook } = require('../controllers/facebookController')
const task = require('./taskRoute')
const {openWeather} = require('../controllers/weatherController')

router.get('/suhu/:city', openWeather)
router.post('/signinfb', facebook)
router.post('/signup', signup)
router.post('/signin', signin)

router.use('/tasks', task)

/* GET home page. signinfb */
router.get('/', function(req, res, next) {
  res.send('Halo Asrul H')
})

module.exports = router