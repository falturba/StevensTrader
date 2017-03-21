import React from 'react'
import ReactDom from 'react-dom'
import {connect} from 'react-redux'
import NewsFeedScss from '../../scss/NewFeed.scss'
import store from '../../redux/store'
import {getProductNewFeedAction} from '../../redux/actions/productsActions'
import Item from './Item'

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
                    { this.props.products&&this.props.products.map(
                        (itemData,i)=>{
                            return <Item key={i} itemData={itemData}/>
                        }
                    )}
                </div>
            </div>)
    }
}
const mapStateToProps=(state)=>{
    console.log('map state new feed')
    return { products:state.productsReducer.products}
}
export default connect(mapStateToProps)(NewsFeed)