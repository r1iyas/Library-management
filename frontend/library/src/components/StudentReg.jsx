import axios from 'axios';
import React, { useState } from 'react'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';



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

    <div>
      <h1>Student Registration</h1>
        <Form onSubmit={addstd}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter Your Name" value={name} onChange={(e)=> setName(e.target.value)} />
      </Form.Group>

       <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Department</Form.Label>
        <Form.Control type="text" placeholder="Enter Your Department" value={department} onChange={(e)=> setDepartment(e.target.value)} />
      </Form.Group>

       <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Year</Form.Label>
        <Form.Control type="number" placeholder="Enter Your Admission year" value={year} onChange={(e)=> setYear(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Enter Your Email" value={email} onChange={(e)=> setEmail(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Phone NO:</Form.Label>
        <Form.Control type="text" placeholder="Enter Your Phone Number" value={phoneno}  onChange={(e)=> setPhoneno(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password"  value={password} onChange={(e)=> setPassword(e.target.value)} />
      </Form.Group>
      

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="password" placeholder="Password"  value={confirmpassword} onChange={(e)=> setConfirmpassword(e.target.value)} />
      </Form.Group>

      {error && <p style={{ color: "red" }}>{error}</p>}


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

export default StudentReg