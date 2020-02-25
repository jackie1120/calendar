import axios from "axios";

const request = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 3000
});

request.interceptors.response.use(
  function(response) {
    const responseData = response.data;
    if (responseData.code === 0 || responseData.code === "0") {
      return responseData;
    } else {
      return Promise.reject(new Error(responseData.msg));
    }
  },
  function(error) {
    return Promise.reject(error);
  }
);

export default request;
