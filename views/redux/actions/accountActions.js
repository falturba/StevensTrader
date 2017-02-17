export const SEND_SIGNUP = "sendsignup";

export const signupAction = (name,email,password)=>{
    return {
        type:SEND_SIGNUP,
        payload:{
            name,
            email,
            password
        }
    }
}