import React from 'react';
import ReactDom from 'react-dom';
// import SignupScss from '../../scss/Signup.scss';
import {loginAction} from '../../redux/actions/accountActions';
import store from '../../redux/store';

const EMAIL = "email";
const PASSWORD = "password";
export default class Login extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            isEmailCorrect:true, 
            isPasswordCorrect:true, 
        };
    }
    handleSubmit = (event)=>{
        console.dir(event);
        event.preventDefault();
        if(
            this.state.isEmailCorrect &&
            this.state.isPasswordCorrect
        ){
            //submit
            store.dispatch( loginAction({
                email:this.state.email,
                password:this.state.password
            }) );
        }
    }

    onChange = (event)=>{
        var state = {};
        var value = event.target.value.trim();
       
        if(event.target.name===EMAIL){
            if(this.validateEmail(value)){
                state.isEmailCorrect = true;
            }else{
                state.isEmailCorrect = false;
            }
        }else if(event.target.name===PASSWORD){
            if(value===""){
                state.isPasswordCorrect = false;
            }else{
                state.isPasswordCorrect = true;
            }
        }
        state[event.target.name] = value;
        this.setState(state);
    }

    validateEmail(email){
        return /^\"?[\w-_\.]*\"?@stevens\.edu$/.test(email);        
    }

    checkStateClass(isCorrect){
        if(!isCorrect){
            return "wrong";
        }
        return "";
    }
    
    render(){
        return(
            <div className="signup-container">
                <form onSubmit={this.handleSubmit}>
                    <h1 >Log In</h1>
                    <hr/>

                    <h3>Email</h3>
                    <input type="text"      name={EMAIL} onChange={this.onChange} className={`${this.checkStateClass(this.state.isEmailCorrect)}`}/>
                    <div className={`warning ${this.checkStateClass(this.state.isEmailCorrect)}`}>Email should be Stevens's email.</div>

                    <h3>Password</h3>
                    <input type="password"  name={PASSWORD} onChange={this.onChange} className={`${this.checkStateClass(this.state.isPasswordCorrect)}`}/>
                    <div className={`warning ${this.checkStateClass(this.state.isPasswordCorrect)}`}>Password can not be empty.</div>

                    <input type="submit" value="SUBMIT" id="submit-button" className="button"/>
                </form>
            </div>
        );
    }
}