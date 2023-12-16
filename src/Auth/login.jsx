import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import PhoneInput from "react-phone-number-input";
import { useUserAuth } from "./UserAuthContext";
import { useNavigate } from "react-router-dom";
import "react-phone-number-input/style.css";
import './login.css'

const Login = () => {
  const [error, setError] = useState("");
  const [number, setNumber] = useState("");
  const [flag, setFlag] = useState(false);
  const [otp, setOtp] = useState("");
  const [result, setResult] = useState("");
  const { setUpRecaptha } = useUserAuth();
  const navigate = useNavigate();
  
  const getOtp = async (e) => {
    e.preventDefault();
    console.log(number);
    setError("");
    if (number === "" || number === undefined)
      return setError("Please enter a valid phone number!");
    try {
      const response = await setUpRecaptha(number);
      setResult(response);
      setFlag(true);
    } catch (err) {
      setError(err.message);
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    if (otp === "" || otp === null) return;
    try {
      await result.confirm(otp);
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    
    
      <div className="row align-items-center h-100-vh">
        <div className="col-12">
          <img className="mb-4" src={`logo.svg`} alt="" width="72" height="57"/>
          <Form onSubmit={getOtp} style={{ display: !flag ? "block" : "none" }}>
            {error && <Alert variant="danger">{error}</Alert>}
              
                  <div className="col-12">
                      <PhoneInput
                        defaultCountry="IN"
                        value={number}
                        onChange={setNumber}
                        placeholder="Enter Phone Number"
                      />
                  </div>
                  <div id="recaptcha-container"></div>

                  <div className="button-right mt-3">
                    <Button type="submit" variant="primary">
                      Send OTP
                    </Button>
          
                  </div>
            </Form>
            <Form onSubmit={verifyOtp} style={{ display: flag ? "block" : "none" }}>
              <input
                    type="number"
                    className="PhoneInputInput"
                    placeholder="Enter OTP"
                    onChange={(e) => setOtp(e.target.value)}
                  />
              <div className="button-right mt-3">
                <Button type="submit" variant="primary">
                  Verify
                </Button>
              </div>
            </Form>
        </div>
      </div>

        


  
  );
};

export default Login;
