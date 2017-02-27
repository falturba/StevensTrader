import React from 'react';
import ReactDom from 'react-dom';
import SignupScss from '../../scss/Signup.scss';
import SellScss from '../../scss/Sell.scss';
import DownloadImage from '../../images/download.png'
import {postProductAction} from '../../redux/actions/postAction';
import store from '../../redux/store';

const TITLE = "title";
const DESCRIPTION = "description";
export default class Sell extends React.Component{
    //read file https://www.html5rocks.com/en/tutorials/file/dndfiles/
    constructor(props){
        super(props);
        this.state = {
            isTitleCorrect:true, 
            isDescriptionCorrect:true,
            hoverStyle:"",
            uploadImagePaths:[]
        };
    }
    dragHover = (event)=>{
        if(this.state.hoverStyle!="hover"){
            this.setState({hoverStyle:"hover"});
        }
        event.preventDefault();
        event.stopPropagation();
        return false;
    }
    dragLeave = (event)=>{
        if(this.state.hoverStyle!=""){
            this.setState({hoverStyle:""});
        }
        event.preventDefault();
        event.stopPropagation();
        return false;
    }
    dropFile = (event)=>{
        var files = event.target.files || event.dataTransfer.files;
        console.log("file");
        console.dir(files);
		// process all File objects
		for (var i = 0, f; f = files[i]; i++) {
			// Only process image files.
            if (!f.type.match('image.*')) {
                continue;
            }

            var reader = new FileReader();

            var _this = this;
            // Closure to capture the file information.
            reader.onload = (function(theFile) {
                return function(e) {
                    // Render thumbnail.
                    //img class="thumb" src="', e.target.result
                    console.dir( e.target.result );
                    console.dir( escape(theFile.name));
                    _this.setState({uploadImagePaths: [..._this.state.uploadImagePaths,e.target.result] });
                };
            })(f);

            // Read in the image file as a data URL.
            reader.readAsDataURL(f);
		}


        this.setState({hoverStyle:""});
        event.stopPropagation();
        event.preventDefault();
        return;
    }
    componentDidMount(){
        this.dragDropArea.addEventListener("dragover", this.dragHover, false);
    }

    handleSubmit = (event)=>{
        console.dir(event);
        event.preventDefault();
        // if(
        //     this.state.isTitleCorrect &&
        //     this.state.isPasswordCorrect
        // ){
            //submit
            store.dispatch( postProductAction({
                title:this.state.title,
                description: this.state.description
            }) );
        // }
    }

    onChange = (event)=>{
        var state = {};
        var value = event.target.value.trim();
       
        if(event.target.name===TITLE){
            if(value===""){
                state.isTitleCorrect = false;
            }else{
                state.isTitleCorrect = true;
            }
        }else if(event.target.name===DESCRIPTION){
            if(value===""){
                state.isDescriptionCorrect = false;
            }else{
                state.isDescriptionCorrect = true;
            }
        }
        state[event.target.name] = value;
        this.setState(state);
    }

    checkStateClass(isCorrect){
        if(!isCorrect){
            return "wrong";
        }
        return "";
    }
    
    render(){

        return(
            <div className="signup-container">
                <form onSubmit={this.handleSubmit}>
                    <h1 >Sell</h1>
                    <hr/>

                    <h3>Title</h3>
                    <input type="text"      name={TITLE} onChange={this.onChange} className={`${this.checkStateClass(this.state.isTitleCorrect)}`}/>
                    <div className={`warning ${this.checkStateClass(this.state.isTitleCorrect)}`}>Title can not be empty.</div>

                    <h3>Description</h3>
                    <textarea  name={DESCRIPTION} onChange={this.onChange} className={`${this.checkStateClass(this.state.isDescriptionCorrect)}`}/>
                    <div className={`warning ${this.checkStateClass(this.state.isDescriptionCorrect)}`}>Description can not be empty.</div>

                    <h3>Upload</h3>
                                    

                    <div className="upload-image-container">
                        {this.state.uploadImagePaths.map( (image,i)=>(
                            <div className="image-container">
                                <a href="#" ref={child=>{  }} className="close-button"/>
                                <img key={`image-${i}`} src={image}/>
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
                    <input type="submit" value="POST" id="submit-button" className="button"/>
                </form>
            </div>
        );
    }
}