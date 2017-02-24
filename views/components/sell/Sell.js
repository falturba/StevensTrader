import React from 'react';
import ReactDom from 'react-dom';
import SignupScss from '../../scss/Signup.scss';
import {postProductAction} from '../../redux/actions/postAction';
import store from '../../redux/store';

const TITLE = "title";
const DESCRIPTION = "description";
export default class Sell extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            isTitleCorrect:true, 
            isDescriptionCorrect:true, 
        };
    }
    handleSubmit = (event)=>{
        console.dir(event);
        event.preventDefault();
        // if(
        //     this.state.isTitleCorrect &&
        //     this.state.isPasswordCorrect
        // ){
            //submit
            store.dispatch( postProductAction({
                title:this.state.title,
                description: this.state.description
            }) );
        // }
    }

    onChange = (event)=>{
        var state = {};
        var value = event.target.value.trim();
       
        if(event.target.name===TITLE){
            if(value===""){
                state.isTitleCorrect = false;
            }else{
                state.isTitleCorrect = true;
            }
        }else if(event.target.name===DESCRIPTION){
            if(value===""){
                state.isDescriptionCorrect = false;
            }else{
                state.isDescriptionCorrect = true;
            }
        }
        state[event.target.name] = value;
        this.setState(state);
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
                    <h1 >Sell</h1>
                    <hr/>

                    <h3>Title</h3>
                    <input type="text"      name={TITLE} onChange={this.onChange} className={`${this.checkStateClass(this.state.isTitleCorrect)}`}/>
                    <div className={`warning ${this.checkStateClass(this.state.isTitleCorrect)}`}>Title can not be empty.</div>

                    <h3>Description</h3>
                    <textarea  name={DESCRIPTION} onChange={this.onChange} className={`${this.checkStateClass(this.state.isDescriptionCorrect)}`}/>
                    <div className={`warning ${this.checkStateClass(this.state.isDescriptionCorrect)}`}>Description can not be empty.</div>

                    <input type="submit" value="POST" id="submit-button" className="button"/>
                </form>
            </div>
        );
    }
}