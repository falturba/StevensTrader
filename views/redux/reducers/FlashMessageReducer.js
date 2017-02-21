import {ADD_FLASH_MESSAGE} from '../actions/flashMessageAction';


export default (state = [], action = {}) => {
  console.log("..... AddFlashMessage....");
  console.dir(action);
  switch(action.type) {
    case ADD_FLASH_MESSAGE:
      return [
        ...state,
        {
          id: Math.random(),
          type: action.payload.type,
          text: action.payload.text
        }
      ];
    default: return state;
  }
}