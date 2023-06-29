import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

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

interface MyReimbursementsProps {
  userId: number;
}

const MyReimbursements: React.FC<MyReimbursementsProps> = ({ userId }) => {
  const [reimbursements, setReimbursements] = useState<Reimbursement[]>([]);

  useEffect(() => {
    const fetchReimbursements = async (userId: number) => {
      try {
        const response = await axios.get(
          `http://localhost:8080/reimbursements/user/${userId}`
        );
        setReimbursements(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching reimbursements:", error);
      }
    };

    fetchReimbursements(Number(userId));
  }, [userId]);

  return (
    <div className="container">
      <h2 className="mt-4">My Reimbursements</h2>
      <div className="d-flex justify-content-center">
        <Link to="/create/reimbursement">
          <button className="btn btn-primary me-2">
            Create A New Reimbursement
          </button>
        </Link>
      </div>
      <table className="table table-striped table-bordered mt-4">
        <thead>
          <tr>
            <th>Reimbursement Type</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {reimbursements.map((reimbursement) => (
            <tr key={reimbursement.id}>
              <td>
                <h4>{reimbursement.name}</h4>
              </td>
              <td>{reimbursement.amount}</td>
              <td>{reimbursement.description}</td>
              <td>{reimbursement.status.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyReimbursements;
