import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  role: Role;
}

interface Role {
  id: number;
  name: string;
}

const TableContainerStyled = styled(TableContainer)`
  margin-top: 16px;
`;

const HeadingTypography = styled(Typography)`
  font-size: 24px;
  margin-bottom: 16px;
`;

const UsersComponent = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/users");
        const responseData = response.data;
        console.log("Response Data:", responseData); // Log the response data for inspection
        setUsers(responseData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <HeadingTypography variant="h2">Users</HeadingTypography>
      <TableContainerStyled>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Position</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.role.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainerStyled>
    </div>
  );
};

export default UsersComponent;
