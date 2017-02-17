import {SEND_SIGNUP} from '../actions/accountActions';
import {SIGNUP_STORE} from '../store';

let defaultState = {isSignup:false};
export default function projectReducer(state=defaultState,action){
    console.log("_______projectReducer:_______");
    console.dir(state);
    console.log("_____________________________");
    switch (action.type){
        case SEND_SIGNUP: 
            return {...state, ...action.payload};
        default:
            return {};
    }
    return state;
}