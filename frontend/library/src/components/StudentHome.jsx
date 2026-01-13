import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import './StudentHome.css';



function StudentHome() {

    const [studentdata,setStudentdata]=useState({})

    let logid=localStorage.getItem('loginstudentid')
    console.log('logid',logid);
    
    
    const fetchData =async()=>{
      console.log('start');
      
      const result =await axios.get(`http://localhost:5000/studentdata/${logid}`)
      console.log(result);
      
      setStudentdata(result.data.result)
      
    }

    useEffect(()=>{
      fetchData()
    },[])
    console.log(studentdata);
    


  return (
      <div className="studenthome-container">

      {/* NAVBAR */}
      <Navbar expand="lg" className="bg-body-tertiary navbar-custom">
        <Container>
          <Navbar.Brand href="#home">Student Portal</Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Login Page</Nav.Link>
               <Nav.Link as={Link} to="/ViewBook">Manage Books</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>


      {/* WELCOME TEXT */}
      <div className="description">
        <h2>
          Welcome to your student dashboard.  
          <br />Manage your Books, view your details, and explore more.
        </h2>
      </div>


      {/* STUDENT DETAILS */}
      <div className="student-info">
        <h1>Student Home</h1>

        {studentdata._id ? (
          <>
            <h3>Name: {studentdata.name}</h3>
            <h3>Email: {studentdata.email}</h3>
            <h3>Department: {studentdata.department}</h3>
            <h3>Year: {studentdata.year}</h3>
            <h3>Phone: {studentdata.phoneno}</h3>
          </>
        ) : (
          <h3>Loading student information...</h3>
        )}
      </div>

    </div>
  );
}

export default StudentHome;