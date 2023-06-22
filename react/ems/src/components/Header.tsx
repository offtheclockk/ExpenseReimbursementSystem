import React from "react";
import { Link } from "react-router-dom";
import { Button, Toolbar, Typography } from "@mui/material";
import axios from "axios";

const Header = () => {
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
    <Toolbar>
      <Button component={Link} to="/users" onClick={getUsers}>
        <Typography variant="button">Employees</Typography>
      </Button>
      <Button component={Link} to="/reimbursements" onClick={getReimbursements}>
        <Typography variant="button">Reimbursements</Typography>
      </Button>
    </Toolbar>
  );
};

export default Header;
