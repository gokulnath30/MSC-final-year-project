import React, { useState,useEffect } from "react";
import BNav from '../nav'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Database from '../database';
import $ from 'jquery';
import { FaTrash  } from 'react-icons/fa'
import swal from 'sweetalert';





const ViewForm = () =>{
    const db = Database()
    const showTable = db.forms.toArray()

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [showoption, showoptionFun]  = useState(false);
    const [optionsCount, UpdateCount]  = useState([]);
    const [TableData, UpdateTable]  = useState([])


    const getTable =()=>{
      showTable.then(async(res)=>{
        await UpdateTable([...res])
        })
    }
    useEffect( () => { 
      getTable()
    }, []);
    


    const getInput = (val) => {
      if(val === 'Select box'){
        showoptionFun(true);
        UpdateCount([])
        UpdateCount([...optionsCount, optionsCount.length])
      }
      else{
        showoptionFun(false);
      }
    }
    

    const addRow = ()=>{
      handleShow(false);
    }

    const addoptions = ()=>{
      UpdateCount([...optionsCount, optionsCount.length]);
    }

    const removeDiv = (ids)=>{
      $("#"+ids).remove()
      optionsCount.pop()
    }
    
    const savedata = ()=>{

      var temp = {}
      var ops = []
      var today = new Date();
      var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      var time = today.getHours()+':'+today.getMinutes()+':'+today.getSeconds();
      let flag = false
      var fdata = $('#formData').serializeArray()
      $.each(fdata, function (i, input) {
        
        if(input['value']){
          flag = true;
        }else{
          alert("Please Enter Input")
          return false
        }

      if(input['name'] === 'options')
        ops.push(input['value'])
      else
        temp[input['name']] = input['value'] 
        
      });
      
      temp['options'] = ops
      temp['time'] = date + ' '+ time  
      if(flag)
      db.forms.add(temp)
      getTable()
      handleClose(true);
      swal("Data added successfully!");


    }

    const deleteRow = (id)=>{
      console.log(id,'delete')
      db.forms.delete(id)
      getTable();
      

    }
  
    return (
      <div className="p-2">
       
        {/* Modal */}
        
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Fields</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form id="formData">

              <Form.Group className="mb-3" controlId="lableid">
                <Form.Label>Lable</Form.Label>
                <Form.Control name="lables" type="text" placeholder="Enter Lable" required  />
              </Form.Group>

              <Form.Group className="mb-3" controlId="inputs">
                  <Form.Label>Input</Form.Label>  
                  <div className="row">
                    <div className="mb-3">
                        <Form.Select aria-label="inputs" name="inputs" onChange={(e) =>getInput(e.target.value)}  required>
                          <option value="">Select</option>
                          <option value="Text field">Text Field</option>
                          <option value="Select box">Select box</option>
                          <option value="Check box">Check box</option>
                        </Form.Select>
                    </div>
                  </div>
              </Form.Group>

              {showoption ? (
                  <div className="">
                     {optionsCount.map((item,i) => (
                      
                       <div id={'rowid_'+i} key={i} className="row mt-2">
                          <div className="col-8">
                            <input name="options" type="text" className="form-control" placeholder="Enter Options"/> 
                          </div> 

                          <div className="col-4">
                            <button type="button" className="float-start btn btn-primary btn-circle text-right" onClick={addoptions}>+</button>
                            <button type="button" className="float-end btn btn-danger  btn-circle text-left" onClick={()=>removeDiv('rowid_'+i)}>-</button>
                          </div> 
                       </div>
                      ))}
                  </div> 
                  ):(<></>)}
             
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={savedata}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>

        <div className="row">
          <div className="col-6">
            <h5 className="bold">Create Form</h5>
          </div>
          <div className="col-6">
            <button onClick={addRow} type="button" className="float-end btn btn-primary btn-circle text-right">+</button>
          </div>  
        </div>
        
        <div className="table-responsive">
          
          <table id="show_table" className="table">
          <thead>
            <tr>
              <th>Lable</th>
              <th>Input</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
          {
          TableData.map((val, key) =>{ 
          return (  
            <tr key={key}>
            <td>{val.lables}</td>
            <td> <div>{val.inputs}</div> {val.options.map((v,k)=>(<span key={k}>{v},&nbsp;</span>))}</td>
            <td><div onClick={()=>deleteRow(val.id)} className="btn btn-danger"><FaTrash/></div></td>
          </tr>

          ) })}
          
        
          </tbody>
        </table>
        </div>

        <BNav/>
      </div> 
 


)}

  export default ViewForm