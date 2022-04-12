import axios from "axios";

const axiosInstance = axios.create({ baseURL: "http://localhost:2021" });

export default axiosInstance;