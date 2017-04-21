import React from 'react'
import ReactDom from 'react-dom'

function getDisplayImagePath(imagePaths){
    if(imagePaths && imagePaths[0]){
        return `/images/${imagePaths[0].thumbnailName}`
    }
}

const Item = (props)=>{
    return(
        <a href={`/item/${props.itemData._id}`} className="item-container">
            <div className="image-container">
                {/*<img src={getDisplayImagePath(props.itemData.medias)}/>*/}
                <img src={"/services/getthumbnail/"+props.itemData._id}/>
            </div>
            <div className="detail">
                <div className="title"><h3>{props.itemData.title}</h3></div>
                <div className="price"><h3>${props.itemData.price}</h3></div>
            </div>
            
        </a>
    )
}

export default Item

