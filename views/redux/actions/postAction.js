import axios from 'axios';

const POST_FAIL = "postfail";
export function postProductAction(data){
    return dispatch=>{
        return axios.post('/services/postproduct',data)
        .then((response) => {
            console.log("post success");
            console.dir(response);
        })
        .catch((response) => {
            console.log("post fail");
            console.dir(response);
            dispatch({type: POST_FAIL, payload: response.data})
        });
    }
}