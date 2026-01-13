import axios from 'axios';
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import './Loginpage.css';


function Loginpage() {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const navigate =useNavigate();

  const addLoginData =async (event)=>{
    event.preventDefault();
    const body ={email,password};

    try{
      const result =await axios.post("http://localhost:5000/addlogindata",body);
      alert("LOGIN SUCCESSFULLY");

      const user =result.data.user;

      if(user.role ==="student"){
          localStorage.setItem('loginstudentid',user._id);
          navigate('/StudentHome');

        }else if(user.role==="Admin"){
          localStorage.setItem('loginadminid',user._id);
          navigate('/AdminHome');
        }
    }catch(error){
        console.log(error);
        alert("Login failed, try again");
    }
  }



return (
  <div className="login-container">
    <div className="login-box">
      <h1 className="login-title">Login</h1>

      <Form onSubmit={addLoginData}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="User Name"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>

        <Button variant="primary" type="submit" className="login-btn">
          Submit
        </Button>
      </Form>
    </div>
  </div>
);

}

export default Loginpage