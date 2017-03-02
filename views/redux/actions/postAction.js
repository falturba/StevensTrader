import axios from 'axios'
import { browserHistory } from 'react-router'
const POST_FAIL = "postfail"
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