import { itemService } from "../../services/itemService";

export function loadItems(filterBy) {
    return async dispatch => {
        try {
            const items = await itemService.getItems(filterBy)
            dispatch({ type: 'SET_TOYS', items })
        } catch (err) {
            console.log('ItemsActions: err in loadItems', err);
        }
    }
}

export function removeItem(itemId) {
    return async dispatch => {
        try {
            const item = await itemService.remove(itemId)
            dispatch({ type: 'REMOVE_TOY', itemId })
            dispatch({ type: 'SEND_NOTIFICATION', notification: 'Item Removed' })
            setTimeout(() => {
                dispatch({ type: 'CLEAR_NOTIFICATION' })
            }, 2000);
        } catch (err) {
            console.log('ItemsActions: err in RemoveItem', err);
        }

    }
}

export function getItemById(itemId) {
    return async dispatch => {
        try {
            const item = await itemService.getById(itemId)
            dispatch({ type: 'SET_TOY', item })
        } catch (err) {
            console.log('ItemsActions: err in GetSingleItem', err);
        }
    }
}

export function saveItem(item) {
    return async dispatch => {
        try {
            const itemObj = await itemService.save(item)
            dispatch({ type: 'SAVE_TOY', item: itemObj.item, isNew: itemObj.isNew })
            const notificationTxt = (itemObj.isNew) ? 'Item Added' : 'Item Updated'
            dispatch({ type: 'SEND_NOTIFICATION', notification: notificationTxt })
            setTimeout(() => {
                dispatch({ type: 'CLEAR_NOTIFICATION' })
            }, 2000);
        } catch (err) {
            console.log('ItemsActions: err in SaveItem', err);
        }
    }
}

export function clearNotification() {
    return dispatch => {
        dispatch({ type: 'CLEAR_NOTIFICATION' })
    }
}
