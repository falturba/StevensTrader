import React from 'react'
import ReactDom from 'react-dom'
import {connect} from 'react-redux'
import NewsFeedScss from '../../scss/NewFeed.scss'
import store from '../../redux/store'
import {getProductNewFeedAction} from '../../redux/actions/productsAction'

class NewsFeed extends React.Component{
    constructor(props){
        super(props)
        store.dispatch(getProductNewFeedAction())
    }
    render(){
        console.log("... NewsFeed [render]....")
        console.dir(this.props)
        return(
            <div className="container">
                <div className="list-item-container">
                    <div className="item-container">
                        <div className="image-container">
                            <img src="/images/6f6f8c09512c5b64b58e04f8a2aa4590_small"/>
                        </div>
                        <h3>test</h3>
                    </div>
                    <div className="item-container"></div>
                    <div className="item-container"></div>
                    <div className="item-container"></div>
                    <div className="item-container"></div>
                </div>
            </div>)
    }
}
const mapStateToProps=(state)=>{
    return { messages:state.flashMessages}
}
export default connect(mapStateToProps)(NewsFeed)