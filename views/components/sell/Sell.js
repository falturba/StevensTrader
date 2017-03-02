import React from 'react'
import ReactDom from 'react-dom'
import SignupScss from '../../scss/Signup.scss'
import SellScss from '../../scss/Sell.scss'
import DownloadImage from '../../images/download.png'
import {postProductAction} from '../../redux/actions/postAction'
import store from '../../redux/store'
import {condintionEnum} from '../../../src/models/enum'

const TITLE = "title"
const DESCRIPTION = "description"
const CONDITION = "condition"
const PRICE = "price"

//https://github.com/mzabriskie/axios/blob/master/examples/upload/index.html
//http://www.hugethoughts.com/blog/upload-file-using-axios-and-redux-form/
//http://shiya.io/simple-file-upload-with-express-js-and-formidable-in-node-js/
//http://www.codediesel.com/nodejs/processing-file-uploads-in-node-js/

export default class Sell extends React.Component{
    //read file https://www.html5rocks.com/en/tutorials/file/dndfiles/
    constructor(props){
        super(props)
        this.state = {
            isTitleCorrect:true, 
            isDescriptionCorrect:true,
            hoverStyle:"",
            uploadImageObjects:[]
        }
        console.log("condintionEnum:",condintionEnum)
    }
    dragHover = (event)=>{
        event.preventDefault()
        event.stopPropagation()
        if(this.state.hoverStyle!="hover"){
            this.setState({hoverStyle:"hover"})
        }
        return false
    }
    dragLeave = (event)=>{
        event.preventDefault()
        event.stopPropagation()
        if(this.state.hoverStyle!=""){
            this.setState({hoverStyle:""})
        }
        return false
    }
    dropFile = (event)=>{
        var files = event.target.files || event.dataTransfer.files
        console.log("file")
        console.dir(files)
		// process all File objects
		for (var i = 0, f; f = files[i]; i++) {
			// Only process image files.
            if (!f.type.match('image.*')) {
                continue
            }

            var reader = new FileReader()

            var _this = this
            // Closure to capture the file information.
            reader.onload = (function(theFile) {
                return function(e) {
                    // Render thumbnail.
                    //img class="thumb" src="', e.target.result
                    console.dir( e.target.result )
                    console.dir( theFile)
                    // console.dir( escape(theFile.name))
                    _this.setState({uploadImageObjects: [
                        ..._this.state.uploadImageObjects,
                        {
                            name:escape(theFile.name),
                            data:e.target.result,
                            file:theFile,

                        }
                    ] })
                }
            })(f)

            // Read in the image file as a data URL.
            reader.readAsDataURL(f)
		}


        this.setState({hoverStyle:""})
        event.stopPropagation()
        event.preventDefault()
        return
    }
    componentDidMount(){
        this.dragDropArea.addEventListener("dragover", this.dragHover, false)
    }

    handleSubmit = (event)=>{
        console.dir(event)
        event.preventDefault()
        // if(
        //     this.state.isTitleCorrect &&
        //     this.state.isPasswordCorrect
        // ){
            //submit
            var formData = new FormData()
            formData.append(TITLE,this[TITLE].value)
            formData.append(DESCRIPTION,this[DESCRIPTION].value)
            formData.append(CONDITION,this[CONDITION].value)
            formData.append(PRICE,this[PRICE].value)
            this.state.uploadImageObjects.map((imageObject)=>{
                // console.log(imageObject.name,imageObject.data)
                formData.append(imageObject.name,imageObject.file)
            })
            store.dispatch( postProductAction(formData) )
        // }
    }

    onChange = (event)=>{
        var state = {}
        var value = event.target.value.trim()
       
        if(event.target.name===TITLE){
            if(value===""){
                state.isTitleCorrect = false
            }else{
                state.isTitleCorrect = true
            }
        }else if(event.target.name===DESCRIPTION){
            if(value===""){
                state.isDescriptionCorrect = false
            }else{
                state.isDescriptionCorrect = true
            }
        }
        state[event.target.name] = value
        this.setState(state)
    }

    checkStateClass(isCorrect){
        if(!isCorrect){
            return "wrong"
        }
        return ""
    }
    
    deleteMe(i,e){
        e.preventDefault()
        let uploadImageObjects = [...this.state.uploadImageObjects]
        uploadImageObjects.splice(i,1)
        this.setState({uploadImageObjects})
    }
    
    render(){
        return(
            <div className="signup-container">
                {/*<form action="/services/postproduct" encType="multipart/form-data" method="post">*/}
                <form onSubmit={this.handleSubmit}>
                    <h1 >Sell</h1>
                    <hr/>

                    <h3>Title</h3>
                    <input type="text"   ref={child=>this[TITLE] = child}   name={TITLE} onChange={this.onChange} className={`${this.checkStateClass(this.state.isTitleCorrect)}`}/>
                    <div className={`warning ${this.checkStateClass(this.state.isTitleCorrect)}`}>Title can not be empty.</div>

                    <h3>Description</h3>
                    <textarea  ref={child=>this[DESCRIPTION] = child} name={DESCRIPTION} onChange={this.onChange} className={`${this.checkStateClass(this.state.isDescriptionCorrect)}`}/>
                    <div className={`warning ${this.checkStateClass(this.state.isDescriptionCorrect)}`}>Description can not be empty.</div>

                    <h3>Condition</h3>
                    {/*<input type="text" ref={child=>this[CONDITION] = child} name={CONDITION} onChange={this.onChange}/>*/}
                    <select ref={child=>this[CONDITION] = child}>
                        {
                            condintionEnum.map(item=> <option key={item} value={item}>{item}</option>)
                        }
                    </select>

                    <h3>Price</h3>
                    <div className="input-group">
                        <span className="input-group-addon">$</span>
                        <input className="form-control" type="text" ref={child=>this[PRICE] = child}name={PRICE} onChange={this.onChange}/>
                    </div>

                    <h3>Upload</h3>
                                    

                    <div className="upload-image-container">
                        {this.state.uploadImageObjects.map( (imageObject,i)=>(
                            <div className="image-container" key={`image-${i}`}>
                                <a href="#" className="close-button" onClick={this.deleteMe.bind(this,i)}/>
                                <img key={`image-${i}`} src={imageObject.data}/>
                            </div>
                        ))}
                    </div> 
                    <div className={`drag-drop-area ${this.state.hoverStyle}`} ref={child=>this.dragDropArea=child}
                        draggable="true"
                        onDragOver={this.dragHover}
                        onDragLeave={this.dragLeave}
                        onDrop={this.dropFile}>
                        <div className="drag-drop-area-line">
                            <h1>Drag and drop file in this box</h1>
                            <img src={DownloadImage}/>
                        </div>
                    </div>
                    {/*<input id="upload-input" type="file" name="uploads-files" multiple="multiple"/>*/}

                    <input type="submit" value="POST" id="submit-button" className="button"/>
                </form>
            </div>
        )
    }
}