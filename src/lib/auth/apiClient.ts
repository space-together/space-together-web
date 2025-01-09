import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:2052/api/v0.0.1",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
