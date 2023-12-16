import React from "react";
import "@tensorflow/tfjs-backend-webgl"; // set backend to webgl
import {Link } from 'react-router-dom';
import Webcam from "react-webcam"; 
import { useNavigate,useLocation } from "react-router-dom";

import "./styles.css";



const GetFrame = () => {
  const navigate = useNavigate();
  const location = useLocation();

  
  
  const captureImg = () => {
    var video = document.getElementById("videoId");
    var canvasImg = document.createElement('canvas');
    canvasImg.height = video.videoHeight;
    canvasImg.width = video.videoWidth;
    var ctxImg = canvasImg.getContext('2d');
    ctxImg.drawImage(video, 0, 0, canvasImg.width, canvasImg.height);
    var capture_img = canvasImg.toDataURL()
    navigate('/preview',{state:{"metal_type":"Angle Bar",img:capture_img}});
    // navigate('/preview',{state:{id:1,img:capture_img}});
  }
  
  const onFileChange =(event) => {
    var reader = new window.FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onloadend =async ()=> {
      await navigate('/preview',{state:{"metal_type":"Angle Bar",img:reader.result}});    
    }
    
  };

  
  return (
    <div className="pixel-app">
        
            <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark" style={{"position":"relative"}}>

              <div className="container-fluid">

          
              </div>

            </nav>

              <div className="pixel-camera-cont">
                  <Webcam
                    src = '1.jpg'
                    id="videoId"
                    audio={false}
                    className="img-fluid"
                    screenshotQuality = "0.95"
                    screenshotFormat="image/jpeg"
                    videoConstraints={{facingMode: "environment"}}>
                    
                  </Webcam>
              </div>

        
            <nav id="navbar_" className="navbar fixed-bottom navbar-expand-sm bg-dark">

              <div className="container-fluid">
            
                <span className="navbar-brand "> <Link to="/home" className="navbar-brand icon-op"><img width="50" height="50" src="static/img/goback.svg"  alt="" /></Link></span>
                <span  onClick={captureImg}  className="pixel-camera-btn navbar-brand "></span>

                <div className="navbar-brand" >
                  <input type="file" onChange={onFileChange} id="fileupload" style={{"display":"none"}} />
                  <label htmlFor="fileupload" className="btn btn-default"> <img width="50" height="50" src="static/img/image.svg" alt="" /> </label>
                </div>

              </div>
            
          </nav>
              
    </div>

  );
};

export default GetFrame;

