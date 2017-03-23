import {SET_CURRENT_USER} from '../actions/accountActions';
import {isEmpty} from 'lodash';

let defaultState = {
    isAuthenticated:false,
    user:{}
};
export default function AccountReducer(state=defaultState,action){
    console.log("_______accountReducer_______");
    console.dir(state);
    console.log("_____________________________");
    switch (action.type){
        case SET_CURRENT_USER: 
            return {
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            }
            //return {...state, ...action.payload};
        default:
            return state;
    }
}