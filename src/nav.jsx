import React  from "react"
import {Link } from 'react-router-dom';
import { FaHome,FaHistory,FaSignOutAlt,FaRegFile  } from 'react-icons/fa'
import { useUserAuth } from "./Auth/UserAuthContext";
import { useNavigate } from "react-router-dom";


const  BNav = () =>{

  const { logOut } = useUserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };


    return (
        <nav className="navbar fixed-bottom navbar-expand-sm nav-style bg-dark">
        <div className="container-fluid">
            <Link to="/home" className="navbar-brand icon-op"><FaHome  /></Link>
            <Link to="/history"  className="navbar-brand icon-op"><FaHistory  /></Link>
            <Link to="/form"  className="navbar-brand icon-op"><FaRegFile  /></Link>
            <Link to="/user" className="navbar-brand  icon-op" onClick={handleLogout} ><FaSignOutAlt/></Link>
        </div>
    </nav>
    )    

}



export default BNav;

