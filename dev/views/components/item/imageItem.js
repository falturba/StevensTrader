import React from 'react'
import ReactDom from 'react-dom'

const ImageItem = (props)=>{
    console.log("ImageItem :: ")
    console.dir(props)
    return <div className="thumb-wrapper">
                    <img src={`/images/${props.props.thumbnailName}`}/>
                </div>
}
export default ImageItem