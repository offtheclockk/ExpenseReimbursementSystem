import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

interface HeaderProps {
  onLogout: () => void;
}

const Header = ({ onLogout }: any) => {
  const handleLogout = () => {
    onLogout();
  };

  const getUsers = () => {
    axios
      .get("http://localhost:8080/users")
      .then((response) => {
        // Handle the response data
        console.log(response.data);
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  };

  const getReimbursements = () => {
    axios
      .get("http://localhost:8080/reimbursements")
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
              <a className="nav-link" href="/users" onClick={getUsers}>
                Employees
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="/reimbursements"
                onClick={getReimbursements}
              >
                All Reimbursements
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="/my/reimbursements"
                onClick={getReimbursements}
              >
                My Reimbursements
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

export default Header;
