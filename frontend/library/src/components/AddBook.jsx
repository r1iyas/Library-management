import React, { useState } from "react";
import axios from "axios";
import "./AddBook.css";

function AddBook() {
  const [bookname, setBookname] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [totalCopies, setTotalCopies] = useState("");
  const [availableCopies, setAvailableCopies] = useState("");

  const addBook = async (e) => {
    e.preventDefault();

    if (!bookname || !author || !category || !totalCopies || !availableCopies) {
      alert("Please fill all fields");
      return;
    }

    try {
     const data = {
    bookname,
    author,
    category,
    totalcopies: Number(totalCopies),
    availablecopies: Number(availableCopies)
    };

      

      const res = await axios.post("http://localhost:5000/add", data);

      alert("Book Added Successfully!");

      // Clear form
      setBookname("");
      setAuthor("");
      setCategory("");
      setTotalCopies("");
      setAvailableCopies("");



    } catch (err) {
      console.log(err);
      alert("Error adding book");
    }
  };

  return (
    <div className="add-book-container">
      <h2>Add New Book</h2>

      <form className="add-book-form" onSubmit={addBook}>
        
        <label>Book Name</label>
        <input
          type="text"
          placeholder="Enter book name"
          value={bookname}
          onChange={(e) => setBookname(e.target.value)}
        />

        <label>Author Name</label>
        <input
          type="text"
          placeholder="Enter author's name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />

        <label>Category</label>
        <input
          type="text"
          placeholder="Enter category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <label>Total Copies</label>
        <input
          type="number"
          placeholder="Enter total copies"
          value={totalCopies}
          onChange={(e) => setTotalCopies(e.target.value)}
        />

        <label>Available Copies</label>
        <input
          type="number"
          placeholder="Enter available copies"
          value={availableCopies}
          onChange={(e) => setAvailableCopies(e.target.value)}
        />

        <button type="submit" className="add-btn">Add Book</button>
      </form>
    </div>
  );
}

export default AddBook;
