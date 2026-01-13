import axios from 'axios';
import React, { useState } from 'react'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './StudentReg.css';



function StudentReg() {

    const [name,setName]=useState("")
    const [department,setDepartment]=useState("")
    const [year,setYear]=useState("")
    const [email,setEmail]=useState("")
    const [phoneno,setPhoneno]=useState("")
    const [password,setPassword]=useState("")
    const [confirmpassword,setConfirmpassword]=useState("")
    const [error,setError]=useState("")

    const addstd =async (event)=>{
      event.preventDefault()

      if(password !==confirmpassword){
        setError("password do not match");
        return;
      }
      if(password.length <6){
        setError("password must be at least 6 characters")
        return;
      }
      setError("");

      const body={name,department,year,email,phoneno,password}

       try{
        const result= await axios.post("http://localhost:5000/addstudent",body)
        console.log(result);
        alert('student registered successfully')
        
       }catch(error){
        console.log(error);
          alert("try again")
       }
    }

  return (
  <div className="studentreg-container">
    <div className="studentreg-box">
      <h1 className="studentreg-title">Student Registration</h1>

      <Form onSubmit={addstd}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Department</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Your Department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Year</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Your Admission Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Phone No</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Your Phone Number"
            value={phoneno}
            onChange={(e) => setPhoneno(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={confirmpassword}
            onChange={(e) => setConfirmpassword(e.target.value)}
          />
        </Form.Group>

        {error && <p className="error-text">{error}</p>}

        <Form.Group className="mb-3">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>

        <Button variant="primary" type="submit" className="studentreg-btn">
          Register
        </Button>
      </Form>
    </div>
  </div>
);

}

export default StudentReg