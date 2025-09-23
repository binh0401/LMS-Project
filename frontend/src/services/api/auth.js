import axiosInstance from "./axiosInstance"



export const signupAPI = async (data) => {
  return axiosInstance.post('/auth/signup', data)
}

export const signinAPI = async (data) => {
  return axiosInstance.post('/auth/signin', data)
}

export const logoutAPI = async () => {
  return axiosInstance.post('/auth/logout')
}

export const getUserAPI = async () => {
  return axiosInstance.get('/auth/get-user')
}


