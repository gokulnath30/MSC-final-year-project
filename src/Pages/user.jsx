import React from "react";
import { FaUser, FaGreaterThan} from 'react-icons/fa'
import BNav from '../nav'

export default function User(){
    return (
        <>
        <div className="p-3">
            <h1 className="p-2 fw-bolder">Profile</h1>
            <center to="#" className="navbar-brand icon-op"><span className="border1 p-3"><FaUser /></span></center>
            
            <h5 className="mt-5 p-2 text-black" style={{"marginLeft":"2rem"}}>Member Since: Oct 2022</h5>
            <div className="border-top">
                <div className="d-flex justify-content-between p-3">
                    <div className="d-flex">
                        <div className="navbar-brand icon-op"><FaUser /></div>
                        <h4 className="mt-2" style={{"marginLeft":"2rem"}}>Logout</h4>
                    </div>
                    <h1 className="icon-op2"><FaGreaterThan /></h1>
                </div>

            </div>

            
           
        </div>

            <BNav/>
        </>
        
    )
}