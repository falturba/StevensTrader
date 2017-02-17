import axios from 'axios';
export const SEND_SIGNUP = "sendsignup";
export const TEST_ACTION = "test_action";

export function signupAction(userData){
    //return dispatch for "thunk" promise
    return dispatch => {
        return axios.post('/services/signup',{...userData,type:'register'});
    }
    
}

export function testAction(data){
    return {
        type: TEST_ACTION,
        payload:{
            data
        }
    }
}