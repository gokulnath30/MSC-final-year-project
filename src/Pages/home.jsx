import React from "react"
import BNav from '../nav'
import './home.css'
import {useNavigate } from 'react-router-dom';


export default function Home(){
  let navigate = useNavigate();
  
  return (
    <div className="home">
      <h1 className="m-3">Templates</h1>
        <div className="table-responsive tdiv">

          <table className="table borderless m-2">
            <tbody>
              <tr>
                <td onClick={()=>{navigate('/camera',{state:{"metal_type":"Angle Bar"}})} }>
                  <div className="card" style={{"width":"8rem"}}>
                    <img className="mx-auto d-block mt-2" width="80" height="80"   crossOrigin='anonymous'   src={`static/img/angle.png`} alt="cutest kitten" />
                    <div className="card-body">
                      <h5 className="card-title text-nowrap">Angle Bar</h5>
                    </div>
                  </div>
                </td>
                
                <td>
                  <div className="card" style={{"width":"8rem"}}>
                    <img className="mx-auto d-block  mt-2" width="80" height="80"   crossOrigin='anonymous'   src={`static/img/pipe.png`} alt="cutest kitten" />
                    <div className="card-body">
                      <h5 className="card-title text-nowrap">pipe</h5>
                    </div>
                  </div>
                </td>
              </tr>

              <tr>
                <td>
                  <div className="card" style={{"width":"8rem"}}>
                    <img className="mx-auto d-block  mt-2" width="80" height="80"   crossOrigin='anonymous'   src={`static/img/square.png`} alt="cutest kitten" />
                    <div className="card-body">
                      <h5 className="card-title text-nowrap">Square Bar</h5>
                    </div>
                  </div>
                </td>

                <td>
                  <div className="card" style={{"width":"8rem"}}>
                    <img className="mx-auto d-block  mt-2" width="80" height="80"   crossOrigin='anonymous'   src={`static/img/square.png`} alt="cutest kitten" />
                    <div className="card-body">
                      <h5 className="card-title text-nowrap">Square Bar</h5>
                    </div>
                  </div>
                </td>
              </tr>
              
              
            </tbody>
          </table>
        </div>

        <BNav/>
    </div>
  )
}


