import React, { useState,useEffect, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { renderBoxes } from "./renderBox";
import {useLocation,useNavigate} from 'react-router-dom';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import locDatabase from '../database'
import "./styles.css";

import $ from 'jquery';
import  {auth,app} from '../firebase'
import { getFirestore } from "firebase/firestore";
import { addDoc, collection } from "firebase/firestore"; 
import { getStorage, ref, uploadString,getDownloadURL } from "firebase/storage";
// import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import swal from 'sweetalert';
import html2canvas from 'html2canvas';
import CurrentTime from './uilts'




export default function Preview() {
  const cropperRef = useRef();
  const canvasRef = useRef(null);
  const ObjCount = useRef(0);
  const location = useLocation();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [thresh, updatethresh] = useState(0.60);
  const [showcrop, showcropFun] = useState(false);
  const [output, outputFun] = useState(location.state.img);
  const [modell, setCount] = useState(null);
  const FormData =useRef([]);
  const db = locDatabase();
  const database = getFirestore(app);

  const storage = getStorage();

  const loadModels = () =>{
    tf.loadGraphModel(`${window.location.origin}/best_v5/model.json`, {
      onProgress: (fractions) => {
        $("#loading").show();
      },
      }).then(async (models) => {
      // Warmup the model before using real data.
      const dummyInput = tf.ones(models.inputs[0].shape);
      await models.executeAsync(dummyInput).then((warmupResult) => {
        tf.dispose(warmupResult);
        tf.dispose(dummyInput);
        $("#loading").hide();
      });

      setCount(models)
    });
  }

   // initial load 
  useEffect(() => {
    loadModels();
  }, []);
 
 const cropOpen = ()=> {
    outputFun(location.state.img)
    showcropFun(true)  
  }

const cropImg = ()=>{
  console.log(cropperRef.current.cropper.getCropBoxData())
  outputFun(cropperRef.current.cropper.getCroppedCanvas().toDataURL())
  showcropFun(false)
}

const cropClose = ()=>{
  outputFun(location.state.img)
  showcropFun(false) 
}

const addData = ()=>{
  const formData = db.forms.toArray()
  formData.then((res)=>{
    FormData.current = [...res]
  })
  handleShow(false);

  
}

const detectFrame = async () => {
  let model = modell
  $("#loading").show();
  tf.engine().startScope();
  let [modelWidth, modelHeight] = model.inputs[0].shape.slice(1, 3);
  var frame = document.getElementById('out_img');

  const input = tf.tidy(() => {
    return tf.image
      .resizeBilinear(tf.browser.fromPixels(frame), [modelWidth, modelHeight])
      .div(255.0)
      .expandDims(0);
  });

  await model.executeAsync(input).then((res) => {
    const [boxes, scores, classes] = res.slice(0, 3);
    const boxes_data = boxes.dataSync();
    const scores_data = scores.dataSync();
    const classes_data = classes.dataSync();

    ObjCount.current = renderBoxes(canvasRef, thresh, boxes_data, scores_data, classes_data);
    tf.dispose(res);
    
  });

  tf.engine().endScope();


  $("#loading").hide();
};


const saveCloud = async() => {
  const savData = {}

  // get form data
  var fdata = $('#CountData').serializeArray();  
  $.each(fdata, function (i, input) {
    savData[input['name']] = input['value'] 
  });

  savData['mobile'] = auth['currentUser']['phoneNumber'].slice(3)
  savData["id"]= Math.random().toString(16)
  // savData['input'] = location['state']['img']
  savData['obj_type'] = location['state']['metal_type']
  savData['time'] = CurrentTime()

  html2canvas(document.querySelector("#countImg")).then(canvas => {
    const storageRef = ref(storage,savData['id']  );
    uploadString(storageRef, canvas.toDataURL(), 'data_url').then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
      savData['url'] = downloadURL
      try {
        addDoc(collection(database, "users"),savData);
        //  db.history.add(savData)
          handleClose(true);
          swal("Data added successfully!");
        } catch (e) {
          console.error("Error adding document: ", e);
        }
        // console.log('File available at', downloadURL);
      });
  

    });
  })
  
  
  

}

  return (
    <div className="pixel-app">

  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Save Record</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form id="CountData">
              
              <Form.Group>
                <Form.Label>Object Count</Form.Label>
                <Form.Control
                    name="count"
                    type="text"
                    placeholder={ObjCount.current}
                    value = {ObjCount.current}
                    readOnly
                  />
              </Form.Group>
              
              <Form.Group>
                <Form.Label>Object Type</Form.Label>
                <Form.Control
                  name="obj_type"
                  type="text"
                  placeholder= {"Angle Bar"}
                  value = {"Angle Bar"}
                  readOnly
                />

              </Form.Group>
                {FormData.current.map((k,v)=>{
                    if(k['inputs'] === "Text field")
                    {
                     return(<Form.Group key={v} className="mb-3" controlId="formBasicEmail">
                     <Form.Label>{k['lables'] }</Form.Label>
                     <Form.Control type="text" name={k['lables']} placeholder={"Enter "+k['lables']} />
                   </Form.Group>) 
                    }
                    else if(k['inputs'] === "Select box")
                    {
                      return(
                      <Form.Group key={v}>
                        <Form.Label>{k['lables'] }</Form.Label>
                        <Form.Select name={k['lables']}  aria-label="Default select example" >
                        <option>Select menu</option>
                        {k['options'].map((val, key) =>(<option value={val}>{val}</option>)) }
                        </Form.Select>
                     </Form.Group>
                     )
                    } 
                    else if(k['inputs'] === "Check box")
                    {
                      return(
                      <Form.Group key={v}>
                        <Form.Label>{k['lables'] }</Form.Label>
                        <Form.Check  type="checkbox" name={k['lables']} />
                     </Form.Group>
                     )
                    }                
                })}
                    
            </Form>
          </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={saveCloud}>
                Save
              </Button>
            </Modal.Footer>
          </Modal>
        
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark" style={{"position":"relative"}}>

            <div className="container-fluid">
              <div className="row"> 
                <div className="col">
                    <img onClick={()=>{navigate('/camera')}} src="static\img\camera.svg" width="30" height="30" className="img-fluid" crossOrigin='anonymous' alt="crop" />
                </div>
              </div>
            
              <strong  className="navbar-brand text-wrap" style={{"color":"#ffff" ,}} >Count : <span id="totalCount">0</span></strong>
              
              <div className="row">
                  <button type="button" className="btn btn-primary col col" onClick={() => {if(thresh >= 0.01) updatethresh(thresh - 0.05)}}>-</button>
                  &nbsp;<button type="button" className="btn btn-light col col">{thresh.toFixed(2)}</button>
                  &nbsp;<button type="button" className="btn btn-primary col"  onClick={() => {if(thresh < 0.99) updatethresh(thresh + 0.05)}}>+</button> &nbsp;&nbsp;
              </div>

            </div>
        </nav>
        
        <div className="preview-img">

        {showcrop ? (
          <div className="row">
            <div className="col-12">
                <Cropper
                  ref={cropperRef}
                  src={output}
                  style={{ height: "100%", width: "100%" }}
                  guides={false}
                  crossOrigin={"true"}
                />
            </div>
          </div>
              
         ) : (

          <div id="countImg">
            <img src={output} className="img-fluid" id="out_img"  crossOrigin='anonymous'  alt="imagepreview" /> 
            <canvas
                  id = "canvasId"
                  className="size"
                  ref={canvasRef}
            />
          </div>

       )}
      
      </div>
        
        <nav id="navbar_" className="navbar fixed-bottom navbar-expand-sm bg-dark">
            <div className="container-fluid">
                <div className="row">

                    <div className="col-6">
                        {showcrop ? (
                            <img onClick={cropClose} src="static\img\img.svg" width="30" height="30" className="img-fluid" crossOrigin='anonymous' alt="closecrop" />
                        ):(
                            <img onClick={cropOpen} src="static\img\crop.svg" width="30" height="30" className="img-fluid" crossOrigin='anonymous' alt="crop" />
                        )}
                        
                    </div>
                      
                    <div className="col-6">
                        <img onClick={addData} src="static\img\file_add.svg" width="30" height="30" className="img-fluid" crossOrigin='anonymous' alt="file" />
                    </div>
                </div>

                {showcrop ? (
                  <button  onClick={cropImg}  type="button" className="btn btn-primary">Crop</button>
                ):(
                  <button onClick={detectFrame} type="button" className="btn btn-primary">Count</button>
                )}

                <div id="loading" className="overlay" style={{ display: "none"}}>
                  <div className="d-flex justify-content-center">  
                    <div className="spinner-grow" role="status" style={{"width": "3rem", "height":"3rem","zIndex":"20"}}>
                      <span className="sr-only">Model Loading...</span>
                    </div>
                  </div>
                </div>
              

                <div className="row">
                    <div className="col-6">
                        <img src="static\img\draw.svg" width="30" height="30" className="img-fluid" crossOrigin='anonymous' alt="crop" />
                    </div>
            
                    <div className="col-6">
                        <img  src="static\img\trash.svg" width="30" height="30" className="img-fluid" crossOrigin='anonymous' alt="crop" />
                    </div>
                </div>
            </div>
              
        </nav>
              
    </div>



    
  );
}
