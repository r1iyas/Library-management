import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";

function AdminBooks() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  // Fetch all books
  const fetchBooks = async () => {
    try {
      const result = await axios.get("http://localhost:5000/get");
      setBooks(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Delete book
  const deleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/delete/${id}`);
      alert("Book deleted successfully");
      fetchBooks(); // refresh list
    } catch (error) {
      console.log(error);
      alert("Delete failed");
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Manage Books</h2>

      <Row>
        {books.map((book) => (
          <Col key={book._id} md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{book.bookname}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {book.author}
                </Card.Subtitle>
                <Card.Text>
                  <strong>Category:</strong> {book.category} <br />
                  <strong>Total Copies:</strong> {book.totalcopies} <br />
                  <strong>Available:</strong> {book.availablecopies}
                </Card.Text>

                <Button
                  variant="primary"
                  className="me-2"
                  onClick={() => navigate(`/EditBook/${book._id}`)}
                >
                  Edit
                </Button>

                <Button
                  variant="danger"
                  onClick={() => deleteBook(book._id)}
                >
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default AdminBooks;
