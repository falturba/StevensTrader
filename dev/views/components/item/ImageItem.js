import React from 'react'
import ReactDom from 'react-dom'

const ImageItem = (props)=>{
    console.log("ImageItem :: ")
    console.dir(props)
    return <div className="thumb-wrapper" onClick={props.props.clickCallback.bindArgs(props.props.imageIndex)}>
                    <img src={`/images/${props.props.thumbnailName}`}/>
                </div>
}
export default ImageItem