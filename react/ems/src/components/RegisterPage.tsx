import React, { useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

interface RegisterPageProps {
  onRegister: () => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ onRegister }) => {
  const history = useHistory();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const newUser = {
        firstName,
        lastName,
        username,
        password,
      };

      const response = await axios.post(
        "http://localhost:8080/auth/register",
        newUser
      );
      console.log(response.data); // You can handle the response data here

      // Reset the form
      setFirstName("");
      setLastName("");
      setUsername("");
      setPassword("");

      // Call the onRegister prop
      onRegister();

      // Redirect to login page
      history.push("/");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="container">
      <h1>Register Page</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            className="form-control"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            className="form-control"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
      <p>
        Already have an account? <Link to="/">Login Here</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
