import React from 'react'
import ReactDom from 'react-dom'

const ItemDetail = (props)=>{
    console.log("item-detail")
    console.dir(props)
    return(
        <div className='detail-column'>
            <h1>{props.title}</h1>
                    <hr/>
            <h3>Condition</h3>
                <div className="detail">{props.condition}</div>
            <h3>price</h3>
                <div className="detail">{props.price}</div>
            <h3>Post At</h3>
                <div className="detail">{props.createdAt}</div>
            <h3>Description</h3>
                <div className="detail">{props.description}</div>
            <hr/>
        </div>
    )
}
export default ItemDetail