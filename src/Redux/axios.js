import axios from "axios";

const instance = axios.create({
  baseURL: "https://localhost:8085/api/v1/",
});

export default instance;
