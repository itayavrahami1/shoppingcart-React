import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import { itemReducer } from "./reducers/itemReducer";
import { userReducer } from "./reducers/userReducer";


const mainReducer = combineReducers({
    itemReducer,
    userReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export const store = createStore(mainReducer, composeEnhancers(applyMiddleware(thunk)))

store.subscribe(() => {
    console.log('Global state is:', store.getState())
})