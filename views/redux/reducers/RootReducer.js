import { combineReducers } from 'redux';

import AccountReducer from './AccountReducer';
import AddFlashReducer from './FlashMessageReducer';

export default combineReducers({
  flashMessages:AddFlashReducer
});