import httpService from "./httpService";

export const itemService = {
    getItems,
    getById,
    remove,
    save
}

function getItems(filterBy = {}) {
    var queryParams = new URLSearchParams()
    for (const filterType in filterBy) {
        queryParams.set(filterType, filterBy[filterType])
    }
    return httpService.get(`shop?${queryParams}`)
}

function getById(itemId) {
    return httpService.get(`shop/${itemId}`)
}

function remove(itemId) {
    return httpService.get(`shop/${itemId}`)
}

// TODO - make sure to send back a var if the item is new or updated 
function save(item) {
    console.log(item);
    if (item._id) {
        item.updatedAt = Date.now();
        return httpService.put(`shop/${item._id}`, item)
    } else {
        item.createdAt = Date.now();
        item.inStock = (Math.random() < 0.75) ? true : false
        return httpService.post('item', item)
    }
}
