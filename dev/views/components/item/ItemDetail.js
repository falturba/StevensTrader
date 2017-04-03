import React from 'react'
import ReactDom from 'react-dom'

const ItemDetail = (props)=>{
    console.log("item-detail")
    console.dir(props)

    let username = "-"
    let email = "-"
    if(!!props.userData){
        username = props.userData.name
        email = props.userData.email
    }
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
                <div className="detail"><pre>{props.description}</pre></div>
            <hr/>
            <h3>Seller Name</h3>
                <div className="detail"><pre>{username}</pre></div>
            <h3>Email</h3>
                <div className="detail"><pre>{email}</pre></div>
        </div>
    )
}
export default ItemDetail