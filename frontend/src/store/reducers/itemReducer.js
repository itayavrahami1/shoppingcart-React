const initialState = {
    items: [],
    notification: ''
}

export function itemReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_TOYS':
            return {
                ...state,
                items: action.items
            }
        case 'REMOVE_TOY':
            const items = state.items.filter(item => item._id !== action.itemId)
            return {
                ...state,
                items
            }
        case 'SAVE_TOY':
            let itemsToSave;
            if (action.isNew) {
                itemsToSave = [...state.items, action.item]
            } else {
                itemsToSave = state.items.map(item => {
                    if (item._id === action.item._id) return action.item
                    else { return item }
                })
            }
            return {
                ...state,
                items: itemsToSave
            }
        case 'SEND_NOTIFICATION':
            return {
                ...state,
                notification: action.notification
            }
        case 'CLEAR_NOTIFICATION':
            return {
                ...state,
                notification: action.notification
            }
        default:
            return state
    }
}