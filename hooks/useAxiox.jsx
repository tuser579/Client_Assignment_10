import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:2005',
});

const useAxios = () => {
    return axiosInstance;
}

export default useAxios;