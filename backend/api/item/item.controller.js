const itemService = require('./item.service')
const logger = require('../../services/logger.service')

async function getItem(req, res) {
    const item = await itemService.getById(req.params.id)
    res.json(item)
}
  
async function getItems(req, res) {
    const items = await itemService.query(req.query)
    // logger.debug(items);
    res.json(items)
}

async function deleteItem(req, res) {
    await itemService.remove(req.params.id)
    res.end()
}

async function updateItem(req, res) {
    const item = req.body;
    await itemService.update(item)
    res.json(item)
}

async function createItem(req, res) {
    const item = req.body;
    await itemService.add(item)
    res.json(item)
}

module.exports = {
    getItem,
    getItems,
    deleteItem,
    updateItem,
    createItem
}