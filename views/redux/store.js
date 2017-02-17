import { applyMiddleware, createStore, compose } from "redux"

import logger from "redux-logger";
import thunk from "redux-thunk";
import accountReducer from "./reducers/accountReducer";
import rootReducer from './reducers/RootReducer';


const middleware = compose(
    applyMiddleware(thunk,logger()),
    window.devToolsExtension ? window.devToolsExtension() : f => f
)

export default createStore(rootReducer, middleware);


