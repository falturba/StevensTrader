import axios from 'axios'
import { browserHistory } from 'react-router'
export const POST_FAIL = "postfail"
export const GET_FEED_SUCCESS = 'getfeedsucess'
export const GET_FEED_FAIL = 'getfeedfail'
export const GET_PRODUCT_SUCCESS = 'getproductsucess'
export const GET_PRODUCT_FAIL = 'getproductfail'

export function postProductAction(data){
    return dispatch=>{
        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }
        return axios.post('/services/postproduct',data,config)
            .then((response) => {
                console.log("post success")
                console.dir(response)
                browserHistory.push('/')
            })
            .catch((response) => {
                console.log("post fail")
                console.dir(response)
                dispatch({type: POST_FAIL, payload: response.data})
            })
    }
}

export function getProductNewFeedAction(){
    return dispatch=>{
        return axios.get('/services/getproducts')
            .then(response=>{
                console.log('get new feed',response)
                dispatch({type: GET_FEED_SUCCESS, payload: response.data.products})
            })
            .catch(response=>{
                console.log('error',response);
                dispatch({type: GET_FEED_FAIL, payload: response})
            })
    }
}

export function getProductAction(id){
    return dispatch=>{
        return axios.get('/services/getproduct/'+id)
            .then(response=>{
                console.log('get new feed',response)
                dispatch({type: GET_PRODUCT_SUCCESS, payload: response.data.product})
            })
            .catch(response=>{
                console.log('error',response);
                dispatch({type: GET_PRODUCT_FAIL, payload: response})
            })
    }
}