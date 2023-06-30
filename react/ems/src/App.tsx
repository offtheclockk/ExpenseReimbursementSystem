import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import LoginPage from "./components/Users/LoginPage";
import Dashboard from "./components/Dashboards/Dashboard";
import Header from "./components/Headers/Header";
import UsersComponent from "./components/Users/UsersComponent";
import ReimbursementsComponent from "./components/Reimbursements/ReimbursementsComponent";
import RegisterPage from "./components/Users/RegisterPage";
import CreateReimbursement from "./components/Reimbursements/CreateReimbursement";
import MyReimbursements from "./components/Reimbursements/MyReimbursements";
import EmployeeHeader from "./components/Headers/EmployeeHeader";
import { getCookie, parseJwt } from "./helpers";
import EmployeeDashboard from "./components/Dashboards/EmployeeDashboard";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState<number>(0);
  const [isAdmin, setIsAdmin] = useState(false);

  const checkTokenAndSetLoginState = () => {
    const token = getCookie("token");
    const id = Number(getCookie("userId"));
    const admin = Boolean(getCookie("admin"));
    if (token) {
      setIsLoggedIn(true);
      setUserId(id);
      if (parseJwt(token).Role === "Admin") {
        setIsAdmin(true);
      }
    }
  };

  useEffect(() => {
    checkTokenAndSetLoginState();
  }, []);

  const handleLogin = (userId: number, token: string) => {
    setIsLoggedIn(true);
    setUserId(userId);
    // Store the login information in a cookie with an expiration date
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7); // Set the expiration date to 7 days from now
    document.cookie = `token=${token}; expires=${expirationDate.toUTCString()}; path=/`;
    document.cookie = `userId=${userId}`;
    if (parseJwt(token).Role === "Admin") {
      setIsAdmin(true);
    }
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

  return (
    <div>
      {isLoggedIn && isAdmin ? (
        <Header onLogout={handleLogout} />
      ) : isLoggedIn ? (
        <EmployeeHeader onLogout={handleLogout} />
      ) : null}
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
        <Route
          path="/dashboard"
          component={isAdmin ? Dashboard : EmployeeDashboard}
        />
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
