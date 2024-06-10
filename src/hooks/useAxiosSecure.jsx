import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "https://machine-world-server.vercel.app",
});
const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
