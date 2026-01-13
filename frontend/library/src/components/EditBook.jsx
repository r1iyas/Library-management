import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Form, Button, Container } from 'react-bootstrap';

function EditBook() {
    
    const  {id} = useParams();
    const navigate =useNavigate();

    const [book, setBook] = useState({
   bookname: "",
   author: "",
   category: "",
  totalcopies: "",
  availablecopies: ""
});
 

    const fetchBook =async ()=>{
        try{
            const result =await axios.get(`http://localhost:5000/get/${id}`);
            setBook(result.data)
        }catch(error){
            console.log("error fetching book",error);
            
        }
    };

    useEffect(()=>{
        fetchBook();
    },[]);


    const updateBook =async (e) =>{
        e.preventDefault();
        try{
            await axios.put(`http://localhost:5000/update/${id}`,book)

            alert("Book Updated Successfully");
            
            navigate("/AdminBooks");
        }catch(err){
            console.log("update error",err);
            

        }
    };




  
  return (
    <Container className="mt-5">
      <h2>Edit Book</h2>
      <Form onSubmit={updateBook} className="mt-4">

        <Form.Group className="mb-3">
          <Form.Label>Book Name</Form.Label>
          <Form.Control
            type="text"
            value={book.bookname}
            onChange={(e) => setBook({ ...book, bookname: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            value={book.author}
            onChange={(e) => setBook({ ...book, author: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            value={book.category}
            onChange={(e) => setBook({ ...book, category: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Total Copies</Form.Label>
          <Form.Control
            type="number"
            value={book.totalcopies}
            onChange={(e) => setBook({ ...book, totalcopies: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Available Copies</Form.Label>
          <Form.Control
            type="number"
            value={book.availablecopies}
            onChange={(e) => setBook({ ...book, availablecopies: e.target.value })}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Update Book
        </Button>
      </Form>
    </Container>
  );
}

export default EditBook;