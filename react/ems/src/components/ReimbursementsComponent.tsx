import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";

interface Reimbursement {
  id: number;
  name: string;
  amount: string;
  description: string;
  status: Status;
  person: Person;
}

interface Person {
  id: number;
  firstName: string;
  lastName: string;
}

interface Status {
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

const ApproveButton = styled(Button)`
  background-color: #4caf50;
  color: white;
  &:hover {
    opacity: 0.8;
  }
`;

const DenyButton = styled(Button)`
  background-color: #f44336;
  color: white;
  &:hover {
    opacity: 0.8;
  }
`;

const ReimbursementsComponent = () => {
  const [reimbursements, setReimbursements] = useState<Reimbursement[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/reimbursements"
        );
        const responseData = response.data;
        console.log("Response Data:", responseData); // Log the response data for inspection
        setReimbursements(responseData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <HeadingTypography variant="h2">Reimbursements</HeadingTypography>
      <TableContainerStyled>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Reimbursement Type</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Employee Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Approve</TableCell>
              <TableCell>Deny</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reimbursements.map((reimbursement) => (
              <TableRow key={reimbursement.id}>
                <TableCell>{reimbursement.name}</TableCell>
                <TableCell>${reimbursement.amount}</TableCell>
                <TableCell>{reimbursement.description}</TableCell>
                <TableCell>
                  {reimbursement.person.firstName}{" "}
                  {reimbursement.person.lastName}
                </TableCell>
                <TableCell>{reimbursement.status.name}</TableCell>
                <TableCell>
                  <ApproveButton variant="contained">Approve</ApproveButton>
                </TableCell>
                <TableCell>
                  <DenyButton variant="contained">Deny</DenyButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainerStyled>
    </div>
  );
};

export default ReimbursementsComponent;
