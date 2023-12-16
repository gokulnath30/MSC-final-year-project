import React, {Component} from 'react'
import {render} from 'react-dom'
import ImageCrop from 'react-image-crop-component'
import 'react-image-crop-component/style.css'


class Demo extends Component{
    constructor(){
        super()
        this.onCropped = this.cropped.bind(this)
    }

    cropped(e) {
        let image = e.image
        let image_data = e.data
        console.log(image,image_data)
    }


    render(){
        return (
        <div style={{width: "300px", height: "300px"}}>
            <ImageCrop src="1.jpg"
            setWidth={300} 
            setHeight={300} 
            square={false} 
            resize={true}
            border={"dashed #ffffff 2px"}
            onCrop={this.cropped}/>
        </div>
        )
    }
    
}


export default Demo