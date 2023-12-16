import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/home"
import Camera from'./Count/camera'
import Preview from'./Count/preview'
import Form from'./Pages/form'
import History from './Pages/history'
import User from './Pages/user'
import Login from "./Auth/login";
import ProtectedRoute from "./Auth/ProtectedRoute";
import { UserAuthContextProvider } from "./Auth/UserAuthContext";


function App() {
  return (
    
    <Router>
      <UserAuthContextProvider>
          <Routes>
            <Route path="/home" element={<ProtectedRoute><Home /> </ProtectedRoute>} />
            <Route path="/camera" element={<ProtectedRoute><Camera /> </ProtectedRoute>} />
            <Route path="/history" element={<ProtectedRoute><History /> </ProtectedRoute>} />
            <Route path="/user" element={<ProtectedRoute><User /> </ProtectedRoute>} />
            <Route path="/preview" element={<ProtectedRoute><Preview /> </ProtectedRoute>} />
            <Route path="/form" element={<ProtectedRoute><Form /> </ProtectedRoute>} />
            <Route path="/" element={<Login />} />
          </Routes>
      </UserAuthContextProvider>

      {/* <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/camera" element={<Camera />} />
            <Route path="/home" element={<Home />} />
            <Route path="/history" element={<History />} />
            <Route path="/user" element={<User />} />
            <Route path="/preview" element={<Preview />} />
            <Route path="/" element={<Login />} />
          </Routes> */}
          
    </Router>
  );
}

export default App
