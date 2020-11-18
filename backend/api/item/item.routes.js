const express = require('express')
const { getItem, getItems, deleteItem, updateItem, createItem } = require('./item.controller')
const router = express.Router()

router.get('/', getItems)
router.get('/:id', getItem)
// router.put('/:id', updateItem)
// router.post('/', createItem)
// router.delete('/:id', deleteItem)

module.exports = router