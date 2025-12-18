import axios from 'axios';
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

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

        }else if(user.role==="admin"){
          localStorage.setItem('loginadminid',user._id);
          navigate('/AdminHome');
        }
    }catch(error){
        console.log(error);
        alert("Login failed, try again");
    }
  }




  return (
    <div><h1>Loginpage</h1> 

         <Form onSubmit={addLoginData} >
      <Form.Group className="mb-3"  controlId="formBasicEmail">
        <Form.Label>User Name</Form.Label>
        <Form.Control type="text" placeholder="User Name" onChange={(e)=> setEmail(e.target.value) } />
    
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(e)=> setPassword(e.target.value) } />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form> 
    </div>
  )
}

export default Loginpage