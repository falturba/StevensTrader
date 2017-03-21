import React from 'react'
import ReactDom from 'react-dom'

const Item = (props)=>{
    return(
        <a href={`/item/${props.itemData._id}`} className="item-container">
            <div className="image-container">
                <img src={`/images/${props.itemData.medias[0].thumbnailName}`}/>
            </div>
            <div className="detail">
                <div className="title"><h3>{props.itemData.title}</h3></div>
                <div className="price"><h3>${props.itemData.price}</h3></div>
            </div>
            
        </a>
    )
}

export default Item

