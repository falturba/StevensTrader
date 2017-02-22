import axios from 'axios';
export const SEND_SIGNUP = "sendsignup";

export const SIGNUP_PASS = "signuppass";
export const SIGNUP_FAIL = "signupfail";

export function signupAction(userData){
    //return dispatch for "thunk" promise
    return dispatch => {
        axios.post('/services/signup',{...userData,type:'register'});
    }
}

export function signinAction(userData){
    //return dispatch for "thunk" promise
    console.log("signin");
    return dispatch => {
        return axios.post('/services/signin',{...userData})
        .then((response) => {
            dispatch({type: SIGNUP_PASS, payload: response.data})
        })
        .catch((response) => {
            dispatch({type: SIGNUP_FAIL, payload: response.data})
        });
    }
}