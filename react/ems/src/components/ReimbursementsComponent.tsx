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
  const [choice, setChoice] = useState<Reimbursement[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/reimbursements");
      const responseData = response.data;
      console.log("Response Data:", responseData); // Log the response data for inspection
      setChoice(responseData);
      setReimbursements(responseData);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const filterPending = (e: any) => {
    e.preventDefault();
    if (e.target.value) {
      setChoice(
        reimbursements.filter(
          (reimbursement) => reimbursement.status.name === e.target.value
        )
      );
    }
  };

  const handleApprove = async (reimbursementId: number) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/reimbursements/${reimbursementId}/approve`
      );
      console.log("Reimbursement approved:", response.data);
      setReimbursements(response.data);
      fetchData();
      // Perform any additional actions after successful approval
    } catch (error) {
      console.error("Error approving reimbursement:", error);
    }
  };

  const handleDeny = async (reimbursementId: number) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/reimbursements/${reimbursementId}/deny`
      );
      console.log("Reimbursement rejected:", response.data);
      setReimbursements(response.data);
      fetchData();
      // Perform any additional actions after successful approval
    } catch (error) {
      console.error("Error rejecting reimbursement:", error);
    }
  };

  return (
    <div>
      <Button value="Pending" onClick={filterPending} name="Pending">
        Pending
      </Button>
      <Button value="Approved" onClick={filterPending} name="Approved">
        Approved
      </Button>
      <Button value="Rejected" onClick={filterPending} name="Rejected">
        Rejected
      </Button>
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
            {choice.map((reimbursement) => (
              <TableRow key={reimbursement.id}>
                <TableCell>{reimbursement.name}</TableCell>
                <TableCell>${reimbursement.amount}</TableCell>
                <TableCell>{reimbursement.description}</TableCell>
                <TableCell>
                  {reimbursement.person.firstName}{" "}
                  {reimbursement.person.lastName}
                </TableCell>
                <TableCell>{reimbursement.status.name}</TableCell>
                {reimbursement.status.name === "Pending" ? (
                  <>
                    <TableCell>
                      <ApproveButton
                        variant="contained"
                        onClick={() => handleApprove(reimbursement.id)}
                      >
                        Approve
                      </ApproveButton>
                    </TableCell>
                    <TableCell>
                      <DenyButton
                        variant="contained"
                        onClick={() => handleDeny(reimbursement.id)}
                      >
                        Deny
                      </DenyButton>
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell />
                    <TableCell />
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainerStyled>
    </div>
  );
};

export default ReimbursementsComponent;
