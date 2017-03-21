import React from 'react'
import ReactDom from 'react-dom'
import {connect} from 'react-redux'
import store from '../../redux/store'
import {getProductAction} from '../../redux/actions/productsActions'
import ImageCatalog from './ImageCatalog'
import ItemScss from '../../scss/Item.scss'

class Item extends React.Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){
        store.dispatch(getProductAction(this.props.params.id))
    }

    render(){
        if(this.props.product){
            return(
                <div className='container'>
                    <div className='container-item'>
                        <ImageCatalog />
                        <div className='detail-column'>bbb</div>
                    </div>
                </div>
            )
        }else{
            return(<div></div>)
        }
    }
}
const mapStateToProps = (state)=>{
    return {
        product:state.productsReducer.product
    }
}
export default connect(mapStateToProps)(Item)