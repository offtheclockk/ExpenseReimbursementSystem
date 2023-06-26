import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import UsersComponent from "./components/UsersComponent";
import ReimbursementsComponent from "./components/ReimbursementsComponent";
import RegisterPage from "./components/RegisterPage";
import CreateReimbursement from "./components/CreateReimbursement";
import MyReimbursements from "./components/MyReimbursements";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState<number>(0);

  useEffect(() => {
    // Check the cookie on application load
    const token = getCookie("token");
    if (token) {
      // Verify the token and set the login status
      setIsLoggedIn(true);
      // Fetch the user ID associated with the token
      const userId = getUserIdFromToken(token);
      // setUserId(userId);
    }
  }, []);

  const handleLogin = (userId: number, token: string) => {
    setIsLoggedIn(true);
    setUserId(userId);
    // Store the login information in a cookie with an expiration date
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7); // Set the expiration date to 7 days from now
    document.cookie = `token=${token}; expires=${expirationDate.toUTCString()}; path=/`;
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserId(0);
    // Clear the cookie on logout
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };

  const handleRegister = () => {
    console.log("User successfully registered");
  };

  // Helper function to retrieve a cookie value by name
  const getCookie = (name: string) => {
    const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
    const cookie = cookies.find((cookie) => cookie.startsWith(`${name}=`));
    if (cookie) {
      return cookie.split("=")[1];
    }
    return null;
  };

  // Helper function to extract the user ID from the token (implementation depends on your token structure)
  const getUserIdFromToken = (token: string) => {
    // Extract the user ID from the token
    // Implement the necessary logic to parse and validate the token structure
    // Return the user ID
    // Example: return tokenPayload.userId;
  };

  return (
    <div>
      {isLoggedIn && <Header onLogout={handleLogout} />}
      <Switch>
        <Route exact path="/">
          {isLoggedIn ? (
            <Redirect to="/dashboard" />
          ) : (
            <LoginPage onLogin={handleLogin} />
          )}
        </Route>
        <Route path="/register">
          <RegisterPage onRegister={handleRegister} />
        </Route>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/users" component={UsersComponent} />
        <Route path="/reimbursements" component={ReimbursementsComponent} />
        <Route path="/create/reimbursement" component={CreateReimbursement} />
        <Route path="/my/reimbursements">
          <MyReimbursements userId={userId} />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
