import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";
function AdminIssueRequests() {

    const [requests,setRequests] =useState([]);

    const fetchRequests =async ()=>{
        try{
            const res =await axios.get(
                "http://localhost:5000/adminIssueRequests"
            )
            setRequests(res.data)
        }catch(error){
            console.error("error fetching requests",error)
        }
    }

    useEffect(()=>{
        fetchRequests();
    },[]);

    const approveRequest =async (id)=>{
        if(!window.confirm("approve this request?"))return;

        try{
            await axios.put(
                `http://localhost:5000/adminIssueRequestsApprove/${id}`
            );
            fetchRequests();
        }catch(error){
            alert(error.response?.data?.message || "approve failed");
        }
    };

    const rejectRequest =async (id)=>{
        if(!window.confirm("reject this request?")) return;

        try{
            await axios.put(
                `http://localhost:5000/adminIssueRequestReject/${id}`
            );
            fetchRequests();
        }catch(error){
            alert (error.response?.data?.message || "reject failed");
        }
    }

     return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Issue Requests</h2>

      <Table bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>User</th>
            <th>Book</th>
            <th>Status</th>
            <th>Request Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {requests.length > 0 ? (
            requests.map((req, index) => (
              <tr key={req._id}>
                <td>{index + 1}</td>
                <td>{req.userName}</td>
                <td>{req.bookName}</td>

                <td>
                  <Badge
                    bg={
                      req.status === "pending"
                        ? "warning"
                        : req.status === "approved"
                        ? "success"
                        : "danger"
                    }
                  >
                    {req.status}
                  </Badge>
                </td>

                <td>
                  {new Date(req.requestDate).toLocaleDateString()}
                </td>

                <td>
                  {req.status === "pending" ? (
                    <>
                      <Button
                        variant="success"
                        size="sm"
                        className="me-2"
                        onClick={() => approveRequest(req._id)}
                      >
                        Approve
                      </Button>

                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => rejectRequest(req._id)}
                      >
                        Reject
                      </Button>
                    </>
                  ) : (
                    <span className="text-muted">No Action</span>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center text-muted">
                No issue requests found
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
}


  

export default AdminIssueRequests