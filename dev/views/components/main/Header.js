import React from 'react';
import ReactDom from 'react-dom';
import {logoutAction} from '../../redux/actions/accountActions';
import {connect} from 'react-redux';
import SignupScss from '../../scss/Header.scss';

import CollapseAnimateComponent from '../../libs/CollapseAnimateComponent';

class Header extends CollapseAnimateComponent{
    constructor (props) {
        super(props);
        this.state = {...this.state,isMenuMoving:true};
        this.menuTopPx = 50;
    }

    logout = (e)=>{
        e.preventDefault();
        this.props.logoutAction();
    }
    
    componentDidMount(){
        super.setCollapseElement(this.nav);
        super.componentDidMount();
        this.collapseButton.addEventListener("click",this.toggleCollpse);

        window.addEventListener("scroll",(event)=>{
            var isMenuMoving = (event.srcElement.body.scrollTop < this.menuTopPx);
            console.log("moving...",event.srcElement.body.scrollTop, this.menuTopPx);
            if(this.state.isMenuMoving != isMenuMoving ){
                this.setState( {...this.state, isMenuMoving});
            }                
        });
    }
    scrollState(){
        return this.state.isMenuMoving?"":"floating-menu";
    }

    render(){
        super.render();

        console.log("--- header ---");
        console.dir(this.props);

        const userLinks = (
            <ul className="navbar navbar-right">
                <li> <a href="#" onClick={this.logout}>Logout</a> </li>
            </ul>
        );
        const guestLinks = (
            <ul className="navbar navbar-right">
                <li> <a href="/signup">Sign up</a> </li>
                <li> <a href="/login">Log in</a> </li>
            </ul>
        );

        return(
            <div className="header-container">
                <div className={`header-fullwidth-container ${this.scrollState()}`}>
                    <div className={`container`}>
                        <div className="page-header">
                            <div className="navbar-header">
                                <div className="brand-wrapper">
                                    <a href="/">
                                        <img className="brand-icon" src="http://www.stevensducks.com/images/logo_large.png"/>
                                    </a>
                                </div>
                                <button ref={(child)=>{this.collapseButton = child;}} type="button" className="hamburger-toggle collapsed">
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                </button>
                            </div>

                            <nav ref={(child)=>{this.nav = child;}} style={ this.animateStyle }  >
                                <ul className="navbar">
                                    <li> <a href="/sell">Sell</a> </li>
                                    <li> <a href="../projects">New</a> </li>
                                    <li> <a href="../about">ABOUT</a> </li>                    
                                </ul>
                                {this.props.isAuthenticated?userLinks:guestLinks}
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

function mapStateToProps(state){
    return {
        ...state.accountReducer
    }
}
export default connect(mapStateToProps, {logoutAction})(Header);