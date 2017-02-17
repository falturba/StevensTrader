import { applyMiddleware, createStore, combineReducers } from "redux"

import logger from "redux-logger";
import thunk from "redux-thunk";
import accountReducer from "./reducers/accountReducer"

const reducers = combineReducers(
    {
        account:accountReducer
    })

const middleware = applyMiddleware(thunk,logger())

export default createStore(reducers, middleware)

export const SIGNUP_STORE = "signup_store";