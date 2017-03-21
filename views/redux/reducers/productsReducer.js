import {GET_FEED_SUCCESS,GET_FEED_FAIL, GET_PRODUCT_SUCCESS, GET_PRODUCT_FAIL} from '../actions/productsActions';
import {isEmpty} from 'lodash';

let defaultState = {
};
export default function ProductReducer(state=defaultState,action){
    console.log("_______ProductReducer_______");
    console.dir(state);
    console.dir(action.payload);
    console.log("_____________________________");
    switch (action.type){
        case GET_FEED_SUCCESS: 
            return {
                products: action.payload
            }
        case GET_FEED_FAIL: 
            return {
                products: []
            }
        case GET_PRODUCT_SUCCESS: 
            return {
                product: action.payload
            }
        case GET_PRODUCT_FAIL: 
            return {
                product: {}
            }
        default:
            return state;
    }
}