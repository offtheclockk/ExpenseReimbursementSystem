import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080", // Replace with your API base URL
});

// Set the default Authorization header using the stored token
const token = localStorage.getItem("token");
if (token) {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export default api;
