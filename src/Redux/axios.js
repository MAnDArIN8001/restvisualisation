import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8085/api/v1/",
});

export default instance;
