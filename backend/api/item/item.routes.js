const express = require('express')
// const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')
const { getItem, getItems, deleteItem, updateItem, createItem } = require('./item.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getItems)
router.get('/:id', getItem)
router.put('/:id', updateItem)
router.post('/', createItem)
router.delete('/:id', deleteItem)
// router.get('/', getItems)
// router.get('/:id', getItem)
// router.put('/:id',  requireAuth, updateItem)
// router.delete('/:id',  requireAuth, requireAdmin, deleteItem)

module.exports = router