import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import './ViewBook.css';

function ViewBook() {

  const [books, setBooks] = useState([]);
  const [searchBook, setSearchBook] = useState("");
  const [searchAuthor, setSearchAuthor] = useState("");

  const userId = localStorage.getItem("loginuserid");

  const fetchBooks = async () => {
    try {
      const result = await axios.get("http://localhost:5000/get");
      setBooks(result.data);
    } catch (error) {
      console.log("error fetching books:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // 🔒 SAFE FILTER LOGIC (NO CRASH GUARANTEED)
  const filteredBooks = books.filter((book) => {
    const bookName = String(book.bookname || "").toLowerCase();
    const authorName = String(book.author || "").toLowerCase();
    const searchBookText = String(searchBook || "").toLowerCase();
    const searchAuthorText = String(searchAuthor || "").toLowerCase();

    return (
      bookName.includes(searchBookText) &&
      authorName.includes(searchAuthorText)
    );
  });


  const handleIssueRequest = async (book) => {
  if (!userId) {
    alert("Please login to request a book");
    return;
  }

  try {
    const userName =
      localStorage.getItem("student") ||
      localStorage.getItem("username") ||
      "Unknown User";


    await axios.post("http://localhost:5000/issueRequest", {
      bookId: book._id,
      bookName: book.bookname,
      userId: userId,
      userName: userName
    });

    alert(`Issue request sent for "${book.bookname}"`);
  } catch (error) {
      console.error(error.response?.data);
      
    alert(
      error.response?.data?.message ||
      "Failed to send issue request"
    );
  }
};


  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Available Books</h2>

      {/* 🔍 SEARCH INPUTS */}
      <Row className="mb-4">
        <Col md={4}>
          <Form.Control
            type="text"
            placeholder="Search by Book Name"
            value={searchBook}
            onChange={(e) => setSearchBook(e.target.value)}
            className="search-input"

          />
        </Col>

        

        <Col md={4}>
          <Form.Control
            type="text"
            placeholder="Search by Author"
            value={searchAuthor}
            onChange={(e) => setSearchAuthor(e.target.value)}
            className="search-input"

          />
        </Col>
      </Row>

      {/* 📚 BOOK CARDS */}
      <Row>
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <Col md={4} sm={6} xs={12} key={book._id} className="mb-4">
              <Card className="shadow-sm h-100">
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
                    variant="success"
                    disabled={book.availablecopies === 0}
                    onClick={() => handleIssueRequest(book)}
                  >
                    {book.availablecopies === 0
                      ? "Not Available"
                      : "Issue Request"}
                  </Button>



                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <h5 className="text-center text-muted">
            No books found
          </h5>
        )}
      </Row>
    </Container>
  );
}

export default ViewBook;
