import { combineReducers } from 'redux';

import accountReducer from './accountReducer';
import addFlashReducer from './flashMessageReducer';
import productsReducer from './productsReducer';

export default combineReducers({
  accountReducer,
  flashMessages:addFlashReducer,
  productsReducer
});