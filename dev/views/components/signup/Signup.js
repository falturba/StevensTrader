import React from 'react';
import ReactDom from 'react-dom';

import {signupAction} from '../../redux/actions/accountActions';
import {addFlashMessage} from '../../redux/actions/flashMessageAction';
import {connect} from 'react-redux';

import SignupForm from './SignupForm';

export class Signup extends React.Component{
    constructor(props){
        super(props);
        const { signupAction, addFlashMessage } = this.props;
        this.signupAction = signupAction;
        this.addFlashMessage = addFlashMessage;
    }
    
    render(){
        return(
            <SignupForm signupAction={this.signupAction} addFlashMessage={this.addFlashMessage}/>
        );
    }
}

export default connect( null, { signupAction, addFlashMessage })(Signup);