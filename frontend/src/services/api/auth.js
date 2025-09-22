import axiosInstance from "./axiosInstance"



export const signup = async (data) => {
  return axiosInstance.post('/auth/signup', data)
}

export const signin = async (data) => {
  return axiosInstance.post('/auth/signin', data)
}

export const logout = async () => {
  return axiosInstance.post('/auth/logout')
}

export const getUser = async () => {
  return axiosInstance.get('/auth/get-user')
}


