import React from 'react';
import ReactDom from 'react-dom';
import SignupScss from '../../scss/Signup.scss';
import { LoginForm } from 'react-stormpath';

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

    checkStateClass(isCorrect){
        if(!isCorrect){
            return "wrong";
        }
        return "";
    }
    
    render(){
        return(
            <div className="signup-container">
                <LoginForm>
                    <p>
                     <h3>Your Email</h3>
                    <input id="username" type="text" name="username" nChange={this.onChange} className={`${this.checkStateClass(this.state.isEmailCorrect)}`}/>
                    </p>
                    <p>
                    <h3>Password</h3>
                    <input id="password" type="password" name="password" onChange={this.onChange} className={`${this.checkStateClass(this.state.isPasswordCorrect)}`}/>
                    </p>
                    <p data-spIf="form.error">
                     <strong>Error:</strong><br />
                    <span data-spBind="form.errorMessage" />
                    </p>
                    <p>
                    <input type="submit" value="Login" className="button" />
                    </p>
                    </LoginForm>               
                
            </div>
        );
    }
}