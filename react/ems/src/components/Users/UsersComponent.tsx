import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { getCookie } from "../../helpers";

const UsersComponent = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

      const fetchData = async () => {
        try {
          const response = await axios.get("http://localhost:8080/users", {
            headers: {
              Authorization: `Bearer ${getCookie("token")}`,
              "Content-Type": "application/json",
            },
          });
          const responseData = response.data;
          console.log("Response Data:", responseData); // Log the response data for inspection
          setUsers(responseData);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      };

    const handlePromote = async (personId: number) => {
      try {
        const response = await axios.put(
          `http://localhost:8080/users/promote/${personId}`
        );
        console.log("User Promoted:", response.data);
        setUsers(response.data);
        fetchData();
      } catch (error) {
        console.error("Error promoting user:", error);
      }
  };
  
      const handleDemote = async (personId: number) => {
        try {
          const response = await axios.put(
            `http://localhost:8080/users/demote/${personId}`
          );
          console.log("User Demote:", response.data);
          setUsers(response.data);
          fetchData();
        } catch (error) {
          console.error("Error demoting user:", error);
        }
      };

  return (
    <div>
      <h2 className="mt-4 mb-4">Users</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Position</th>
            <th>Promote</th>
            <th>Demote</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user: any) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.role.name}</td>
                {user.role.name === "Admin" ? (
                  <>
                    <td></td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDemote(user.id)}
                      >
                        Demote
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>
                      <button
                        className="btn btn-success"
                        onClick={() => handlePromote(user.id)}
                      >
                        Promote
                      </button>
                    </td>
                    <td></td>
                  </>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6}>Loading...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UsersComponent;