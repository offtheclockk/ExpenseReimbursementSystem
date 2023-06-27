import React, { useState } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

interface LoginResponse {
  accessToken: string;
  userId: number;
}

interface LoginPageProps {
  onLogin: (userId: number, token: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post<LoginResponse>(
        "http://localhost:8080/auth/login",
        {
          username,
          password,
        }
      );
      console.log(response.data);
      const token = response.data.accessToken;
      localStorage.setItem("token", token);
      // Store the token in localStorage or session storage
      // Redirect the user to another page
      history.push("/dashboard");
      onLogin(response.data.userId, token); // Call the onLogin prop
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="container">
      <h1>Login Page</h1>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            className="form-control"
            value={username}
            onChange={handleUsernameChange}
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
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-2">
          Login
        </button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register Here</Link>
      </p>
    </div>
  );
};

export default LoginPage;
