import { combineReducers } from 'redux';

import accountReducer from './accountReducer';
import addFlashReducer from './flashMessageReducer';

export default combineReducers({
  accountReducer:accountReducer,
  flashMessages:addFlashReducer
});