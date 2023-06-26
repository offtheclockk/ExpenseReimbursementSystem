import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "../api";

const CreateReimbursement = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [description, setDescription] = useState("");

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      const newReimbursement = {
        name,
        amount,
        description,
      };

      const response = await api.post(
        "http://localhost:8080/reimbursements",
        newReimbursement
      );
      console.log("Reimbursement created:", response.data);

      // Reset the form
      setName("");
      setAmount(0);
      setDescription("");

      // Redirect to reimbursements page
      history.push("/reimbursements");
    } catch (error) {
      console.error("Error creating reimbursement:", error);
    }
  };

  return (
    <div className="container">
      <h1>Create New Reimbursement</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Type:</label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            className="form-control"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create Reimbursement
        </button>
      </form>
    </div>
  );
};

export default CreateReimbursement;
