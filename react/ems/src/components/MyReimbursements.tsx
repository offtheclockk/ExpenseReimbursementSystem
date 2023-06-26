import React, { useEffect, useState } from "react";
import axios from "axios";

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

interface MyReimbursementsProps {
  userId: number;
}

const MyReimbursements: React.FC<MyReimbursementsProps> = ({ userId }) => {
  const [reimbursements, setReimbursements] = useState<Reimbursement[]>([]);

  useEffect(() => {
    const fetchReimbursements = async (userId: number) => {
      try {
        const response = await axios.get(
          `http://localhost:8080/reimbursements/user/${userId}`
        );
        console.log(response.data);
        setReimbursements(response.data);
      } catch (error) {
        console.error("Error fetching reimbursements:", error);
      }
    };

    fetchReimbursements(userId);
  }, [userId]);

  return (
    <div>
      <h2>My Reimbursements</h2>
      <ul>
        {reimbursements.map((reimbursement) => (
          <li key={reimbursement.id}>
            {/* Display relevant reimbursement data */}
            <p>Amount: {reimbursement.amount}</p>
            <p>Description: {reimbursement.description}</p>
            {/* Add additional fields as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyReimbursements;
