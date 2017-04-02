import React from 'react'
import ReactDom from 'react-dom'
import ImageItem from './ImageItem'

Function.prototype.bindArgs =
function (...boundArgs)
{
    let context = this
    return function(...args) { return context.call(this, ...boundArgs, ...args); }
}

export default class ImageCatalog extends React.Component{
    constructor(props){
        super(props)
        console.log("props::")
        console.dir(props)
        this.imagePaths = props.props
        this.state = {currentImageIndex: 0}
    }

    clickCallback = (imageIndex)=>{
        this.setState({currentImageIndex:imageIndex})
    }
    
    getBigImagePath(){
        if(this.imagePaths && this.imagePaths[this.state.currentImageIndex]){
            return `/images/${this.imagePaths[this.state.currentImageIndex].imageName}`
        }
        return ''
    }
    render(){
        return(
            <div className='image-column'>
                <div className="image-wrapper">
                    <img src={this.getBigImagePath()}/>
                </div>
                {
                    this.props.props.map((imageObject,i)=>{
                        return <ImageItem props={{
                                    ...imageObject,
                                    imageIndex:i,
                                    clickCallback:this.clickCallback
                                }} key={i}/>
                    })
                }
                    
            </div>)
    }
}