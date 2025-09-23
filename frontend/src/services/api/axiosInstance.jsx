import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
  headers: {
    'Content-Type': 'application/json',
  }
})

//Request Interceptor to put authorization header into the request
axiosInstance.interceptors.request.use(function (request){

  //Check if an token exists in the local storage
  const token = localStorage.getItem('token')

  if(token){
    request.headers.Authorization = `Bearer ${token}`
  }


  return request;
}, function (error){
  return Promise.reject(error);
})

//Response Interceptor to handle errors
axiosInstance.interceptors.response.use(function (response){
  return response.data
})

export default axiosInstance

