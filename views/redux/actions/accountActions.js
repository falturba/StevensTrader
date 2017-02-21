import axios from 'axios';
export const SEND_SIGNUP = "sendsignup";

export function signupAction(userData){
    //return dispatch for "thunk" promise
    return dispatch => {
        return axios.post('/services/signup',{...userData,type:'register'});
    }
    
}
