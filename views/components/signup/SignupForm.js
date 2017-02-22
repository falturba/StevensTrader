import React from 'react';
import ReactDom from 'react-dom';
import SignupScss from '../../scss/Signup.scss';
// import store from '../redux/store';
import {signupAction} from '../../redux/actions/accountActions';
import {connect} from 'react-redux';

const NAME = "name";
const EMAIL = "email";
const PASSWORD = "password";
const PASSWORD_RETYPE = "passwordRetype";



export default class SignupForm extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            isNameCorrect:true, 
            isEmailCorrect:true, 
            isPasswordCorrect:true, 
            isPasswordRetypeCorrect:true
        };
        
    }
    handleSubmit = (event)=>{
        console.dir(event);
        event.preventDefault();
        

        // this.props.addFlashMessage({
        //     type: 'success',
        //     text: 'You signed up successfully. Welcome!'
        // });
        // this.context.router.push('/');
        // return;

        this.props.signupAction({
            name: this.state.name,
            email:this.state.email,
            password:this.state.password
        }).then(
            ({data})=>{
                console.log("Success");
                console.dir(data);

                
                
            },
            ({data})=>{
                console.log("Error");
                console.dir(data);
            }
        );

        
       
        return;

        if(
            this.state.isNameCorrect &&
            this.state.isEmailCorrect &&
            this.state.isPasswordCorrect &&
            this.state.isPasswordRetypeCorrect
        ){
            
            
        }
    }

    onSubmitComplete=()=>{
        // let storeState = store.getState();
        // console.log("subscribe...");
        // console.dir(storeState);
    }

    onChange = (event)=>{
        var state = {};
        var value = event.target.value.trim();
       
        if(event.target.name===NAME){
            if(value===""){
                state.isNameCorrect = false;
            }else{
                state.isNameCorrect = true;
            }
        }else if(event.target.name===EMAIL){
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
        }else if(event.target.name===PASSWORD_RETYPE){
            if(value===this.state[PASSWORD]){
                state.isPasswordRetypeCorrect = true;
            }else{
                state.isPasswordRetypeCorrect = false;
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
                    <h1 >Create Account</h1>
                    <hr/>

                    <h3>Your Name</h3>
                    <input type="text"      name={NAME} onChange={this.onChange} className={`${this.checkStateClass(this.state.isNameCorrect)}`}/>
                    <div className={`warning ${this.checkStateClass(this.state.isNameCorrect)}`}>Name can not be empty.</div>

                    <h3>Email</h3>
                    <input type="text"      name={EMAIL} onChange={this.onChange} className={`${this.checkStateClass(this.state.isEmailCorrect)}`}/>
                    <div className={`warning ${this.checkStateClass(this.state.isEmailCorrect)}`}>Email should be Stevens's email.</div>

                    <h3>Password</h3>
                    <input type="password"  name={PASSWORD} onChange={this.onChange} className={`${this.checkStateClass(this.state.isPasswordCorrect)}`}/>
                    <div className={`warning ${this.checkStateClass(this.state.isPasswordCorrect)}`}>Password can not be empty.</div>

                    <h3>Password re-type</h3>
                    <input type="password"  name={PASSWORD_RETYPE} onChange={this.onChange} className={`${this.checkStateClass(this.state.isPasswordRetypeCorrect)}`}/>
                    <div className={`warning ${this.checkStateClass(this.state.isPasswordRetypeCorrect)}`}>Re-type password is different from the first one.</div>

                    <input type="submit" value="SUBMIT" id="submit-button" className="button"/>
                </form>
            </div>
        );
    }
}

SignupForm.contextTypes={
    router: React.PropTypes.object.isRequired
}
