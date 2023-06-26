import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

interface Reimbursement {
  id: number;
  name: string;
  amount: string;
  description: string;
  status: Status;
  person: Person;
}

interface Person {
  id: number;
  firstName: string;
  lastName: string;
}

interface Status {
  id: number;
  name: string;
}

const ReimbursementsComponent = () => {
  const [reimbursements, setReimbursements] = useState<Reimbursement[]>([]);
  const [choice, setChoice] = useState<Reimbursement[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/reimbursements");
      const responseData = response.data;
      console.log("Response Data:", responseData);
      setChoice(responseData);
      setReimbursements(responseData);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const filterPending = (e: any) => {
    e.preventDefault();
    if (e.target.value) {
      setChoice(
        reimbursements.filter(
          (reimbursement) => reimbursement.status.name === e.target.value
        )
      );
    }
  };

  const handleApprove = async (reimbursementId: number) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/reimbursements/${reimbursementId}/approve`
      );
      console.log("Reimbursement approved:", response.data);
      setReimbursements(response.data);
      fetchData();
    } catch (error) {
      console.error("Error approving reimbursement:", error);
    }
  };

  const handleDeny = async (reimbursementId: number) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/reimbursements/${reimbursementId}/deny`
      );
      console.log("Reimbursement rejected:", response.data);
      setReimbursements(response.data);
      fetchData();
    } catch (error) {
      console.error("Error rejecting reimbursement:", error);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-center mb-3">
        <button
          className="btn btn-primary me-2"
          value="All"
          onClick={fetchData}
        >
          All
        </button>
        <button
          className="btn btn-primary me-2"
          value="Pending"
          onClick={filterPending}
          name="Pending"
        >
          Pending
        </button>
        <button
          className="btn btn-primary me-2"
          value="Approved"
          onClick={filterPending}
          name="Approved"
        >
          Approved
        </button>
        <button
          className="btn btn-primary me-2"
          value="Rejected"
          onClick={filterPending}
          name="Rejected"
        >
          Rejected
        </button>
      </div>
      <div className="mb-3 text-center">
        <Link to="/create/reimbursement">
          <button className="btn btn-primary me-2">
            Create A New Reimbursement
          </button>
        </Link>
        <Link to="/my/reimbursements">
          <button className="btn btn-primary">My Reimbursements</button>
        </Link>
      </div>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Reimbursement Type</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Employee Name</th>
            <th>Status</th>
            <th>Approve</th>
            <th>Deny</th>
          </tr>
        </thead>
        <tbody>
          {choice.map((reimbursement) => (
            <tr key={reimbursement.id}>
              <td>{reimbursement.name}</td>
              <td>${reimbursement.amount}</td>
              <td>{reimbursement.description}</td>
              <td>
                {reimbursement.person.firstName} {reimbursement.person.lastName}
              </td>
              <td>{reimbursement.status.name}</td>
              {reimbursement.status.name === "Pending" ? (
                <>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleApprove(reimbursement.id)}
                    >
                      Approve
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleDeny(reimbursement.id)}
                    >
                      Deny
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td></td>
                  <td></td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReimbursementsComponent;
