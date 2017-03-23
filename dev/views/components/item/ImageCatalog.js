import React from 'react'
import ReactDom from 'react-dom'
import ImageItem from './ImageItem'

function getBigImagePath(imagePaths){
    if(imagePaths && imagePaths[0]){
        return `/images/${imagePaths[0].imageName}`
    }
}

export default class ImageCatalog extends React.Component{
    constructor(props){
        super(props)
        console.log("props::")
        console.dir(props)
    }

    clickCallback(){

    }

    render(){
        return(
            <div className='image-column'>
                <div className="image-wrapper">
                    <img src={getBigImagePath(this.props.props)}/>
                </div>
                {
                    this.props.props.map((imageObject,i)=>{
                        return <ImageItem props={{
                                ...imageObject,
                                clickCallback:this.clickCallback
                            }} key={i}/>
                    })
                }
                    
            </div>)
    }
}