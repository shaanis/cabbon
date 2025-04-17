import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import logo from "../assets/cabbon-logo.png";
import { boysLogindApi, loginUserApi } from '../services/allApis';

const Login = () => {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (userData.email && userData.password) {
      try {
        const result = await loginUserApi(userData);
        console.log("API Response:", result); // Debugging

        if (result.status >= 200 && result.status < 299) {
          sessionStorage.setItem("user", JSON.stringify(result.data.user));
          sessionStorage.setItem("token", JSON.stringify(result.data.token));

          // Navigate based on user role
          const user = JSON.parse(sessionStorage.getItem("user"))
          console.log(user.grade);
          
         if(user.grade == 'captain'){
          navigate('/captain',{replace:true})
         }else if(user.grade =="boyscaptain"){
          navigate('/boyscaptain',{replace:true})
         }else {
          navigate('/boys',{replace:true})
         }
        } else {
          console.log("Login failed, invalid credentials");
        }
      } catch (error) {
        console.error("Login Error:", error);
      }
    } else {
      console.log("Please enter email and password");
    }
  };

  

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <img className="logo" src={logo} alt="Logo" style={{ width: "100px", height: "100px" }} />
      <h3 className="mb-5" style={{ fontFamily: "Joan, serif" }}>CABBON</h3>

      <Form onSubmit={handleLogin}>
        <div className="border border-secondary rounded p-3 d-flex flex-column justify-content-center align-items-center">
          <h3 className="mb-5">Log In</h3>

          <InputGroup className="mb-3">
            <Form.Control
              value={userData.email}
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              placeholder="User ID"
              autoComplete="username"
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <Form.Control
              value={userData.password}
              onChange={(e) => setUserData({ ...userData, password: e.target.value })}
              placeholder="Password"
              type="password"
              autoComplete="current-password"
            />
          </InputGroup>

          <Button onClick={handleLogin} className="mt-2" variant="primary" >
            Sign In
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Login;
