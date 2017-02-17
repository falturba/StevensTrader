import React from 'react';
import ReactDom from 'react-dom';
import SignupScss from '../../scss/Header.scss';

import CollapseAnimateComponent from '../../libs/CollapseAnimateComponent';

export default class Header extends CollapseAnimateComponent{
    constructor (props) {
        super(props);
        this.state = {...this.state,isMenuMoving:true};
        this.menuTopPx = 50;
    }
    
    componentDidMount(){
        super.setCollapseElement(this.nav);
        super.componentDidMount();
        this.collapseButton.addEventListener("click",this.toggleCollpse);

        window.addEventListener("scroll",(event)=>{
            var isMenuMoving = (event.srcElement.body.scrollTop < this.menuTopPx);
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
                                    <li> <a href="../skills">Sell</a> </li>
                                    <li> <a href="../projects">New</a> </li>
                                    <li> <a href="../about">ABOUT</a> </li>                    
                                </ul>
                                <ul className="navbar navbar-right">
                                    <li> <a href="/signup">Sign up</a> </li>
                                    <li> <a href="../signin">Log in</a> </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};