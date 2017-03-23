import axios from 'axios';
import setAuthorizationToken from "../../utils/setAuthorizationToken";
import jwtDecode from 'jwt-decode'
import { browserHistory } from 'react-router'

export const LOGIN_PASS = "loginpass";
export const LOGIN_FAIL = "loginfail";
export const SET_CURRENT_USER = "setcurrentuser";

export function signupAction(userData){
    //return dispatch for "thunk" promise
    return dispatch => {
        return axios.post('/services/signup',{...userData,type:'register'});
    }
}

export function loginAction(userData){
    //return dispatch for "thunk" promise
    return dispatch => {
        return axios.post('/services/login',{...userData})
        .then((response) => {
            if(response && response.data && response.data.token){
                const token = response.data.token;
                localStorage.setItem('jwtToken',token);
                setAuthorizationToken(token);
                dispatch({type: SET_CURRENT_USER, payload: jwtDecode(token)});
                browserHistory.push('/');
            }else{
                dispatch({type: LOGIN_FAIL, payload: response.data})
            }
        })
        .catch((response) => {
            dispatch({type: LOGIN_FAIL, payload: response.data})
        });
    }
}

export function logoutAction(){
    return dispatch =>{
        localStorage.removeItem('jwtToken');
        setAuthorizationToken(false);
        dispatch({type: SET_CURRENT_USER, payload: {}});
        browserHistory.push('/login');
    }
}