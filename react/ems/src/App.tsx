import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import UsersComponent from "./components/UsersComponent";
import ReimbursementsComponent from "./components/ReimbursementsComponent";

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div>
      <h1>Expense Reimbursement System</h1>
      {isLoggedIn && <Header />}
      <Switch>
        <Route exact path="/auth/login">
          <LoginPage onLogin={handleLogin} />
        </Route>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/users" component={UsersComponent} />
        <Route path="/reimbursements" component={ReimbursementsComponent} />
      </Switch>
    </div>
  );
};

export default App;
