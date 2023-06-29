import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

interface EmployeeHeaderProps {
  onLogout: () => void;
  userId: number;
}

const EmployeeHeader = ({ onLogout, userId }: any) => {
  const handleLogout = () => {
    onLogout();
  };

  const getReimbursements = () => {
    axios
      .get(`http://localhost:8080/reimbursements/user/${userId}`)
      .then((response) => {
        // Handle the response data
        console.log(response.data);
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container d-flex justify-content-between">
        <Link className="navbar-brand" to="/">
          Expense Reimbursement System
        </Link>
        <div>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a
                className="nav-link"
                href="/my/reimbursements"
                onClick={getReimbursements}
              >
                Reimbursements
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/" onClick={handleLogout}>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default EmployeeHeader;
