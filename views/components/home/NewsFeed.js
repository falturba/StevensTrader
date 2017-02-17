import React from 'react';
import ReactDom from 'react-dom';
import {connect} from 'react-redux';

class NewsFeed extends React.Component{
    render(){
        console.log("... NewsFeed [render]....");
        console.dir(this.props);
        return(<div style={{width:"1px", height:"2000px"}}>NewFeed</div>);
    }
}
const mapStateToProps=(state)=>{
    return { messages:state.flashMessages};
}
export default connect(mapStateToProps)(NewsFeed);