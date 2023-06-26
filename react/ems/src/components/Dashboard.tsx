import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard: React.FC = () => {
  return (
    <div className="container">
      <div className="jumbotron mt-4">
        <h1 className="display-4">Dashboard</h1>
        <p className="lead">Welcome to the dashboard!</p>
      </div>
    </div>
  );
};

export default Dashboard;
