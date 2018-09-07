const express = require('express');
const router = express.Router();
const isLogin = require('../midlewares/isLogin')
const { createOne, getAllDo, getAllDone, getOne, setDo, setDone, softdelete, unsoftdelete, updateOne, deleteOne } = require('../controllers/taskController')

router.post('/', isLogin, createOne)
router.get('/', isLogin, getAllDo)
router.get('/done', isLogin, getAllDone)
router.get('/:id', isLogin, getOne)
router.patch('/:id/do', isLogin, setDo)
router.patch('/:id/done', isLogin, setDone)
router.patch('/:id/delete', isLogin, softdelete)
router.patch('/:id/restore', isLogin, unsoftdelete)
router.put('/:id', isLogin, updateOne)
router.delete('/:id', isLogin, deleteOne)

module.exports = router;
