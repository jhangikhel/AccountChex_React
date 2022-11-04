import axios from "axios";
import { WEB_API_URL } from "../../Constants/config";
axios.defaults.baseURL = WEB_API_URL;
if (localStorage.getItem("token"))
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("token");

axios.defaults.headers.post["Content-Type"] = "application/json";
axios.interceptors.request.use(
  (request) => {
    return request;
  },
  (error) => {
    
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error.response);
    const { status } = error.response;
    if (status === 401) {
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);
export default {
  post: axios.post,
  get: axios.get,
  all: axios.all,
  delete: axios.delete,
};
