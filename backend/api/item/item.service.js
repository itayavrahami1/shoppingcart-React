
const dbService = require('../../services/db.service')
const reviewService = require('../review/review.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    // getByEmail,
    remove,
    update,
    add
}


async function query(filterBy = {}) {

    const criteria = _buildCriteria(filterBy)
    const collection = await dbService.getCollection('item')
    try {
        const items = await collection.find(criteria).toArray();
        // items.forEach(item => delete item.password);

        return items
    } catch (err) {
        console.log('ERROR: cannot find items')
        throw err;
    }
}

async function getById(itemId) {
    const collection = await dbService.getCollection('item')
    try {
        const item = await collection.findOne({ "_id": ObjectId(itemId) })
        return item
    } catch (err) {
        console.log(`ERROR: while finding item ${itemId}`)
        throw err;
    }
}

async function remove(itemId) {
    const collection = await dbService.getCollection('item')
    try {
        await collection.deleteOne({ "_id": ObjectId(itemId) })
    } catch (err) {
        console.log(`ERROR: cannot remove item ${itemId}`)
        throw err;
    }
}

async function update(item) {
    console.log(item);
    const collection = await dbService.getCollection('item')
    item._id = ObjectId(item._id);

    try {
        await collection.replaceOne({ "_id": item._id }, { $set: item })
        return { item: item, isNew: false };
    } catch (err) {
        console.log(`ERROR: cannot update item ${item._id}`)
        throw err;
    }
}

async function add(item) {
    const collection = await dbService.getCollection('item')
    try {
        await collection.insertOne(item);
        return { item: item, isNew: true };
    } catch (err) {
        console.log(`ERROR: cannot insert item`)
        throw err;
    }
}

function _buildCriteria(filterBy) {
    const criteria = {};
//     for (const filterType in filterBy) {
//         if (filterBy[filterType]){
//             criteria[filterType] = (filterType === 'name') ?
//                 new RegExp(`${filterBy.name}`, 'i') : filterBy[filterType]
//         }
//     }

    if (filterBy.name) {
        criteria.name = new RegExp(`${filterBy.name}`, 'i')
    }
    if (filterBy.inStock) {
        criteria.inStock = (filterBy.inStock === 'true') ? true:false
    }
    if (filterBy.type) {
        criteria.type = filterBy.type
    }
    return criteria;
}


