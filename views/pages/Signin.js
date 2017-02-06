import React from 'react';
import ReactDom from 'react-dom';
import SignupScss from '../scss/Signup.scss';

const EMAIL = "email";
const PASSWORD = "password";
export default class Signing extends React.Component{

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
        }
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

                    <h3>Your Name</h3>
                    <input type="text"      name={EMAIL} onChange={this.onChange} className={`${this.checkStateClass(this.state.isEmailCorrect)}`}/>

                    <h3>Password</h3>
                    <input type="password"  name={PASSWORD} onChange={this.onChange} className={`${this.checkStateClass(this.state.isPasswordCorrect)}`}/>

                    <input type="submit" value="SUBMIT" id="submit-button" className="button"/>
                </form>
            </div>
        );
    }
}