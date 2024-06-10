import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://machine-world-server.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
