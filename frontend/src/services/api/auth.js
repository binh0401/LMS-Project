import axiosInstance from "./axiosInstance"



export const signupAPI =  (data) => {
  return axiosInstance.post('/auth/signup', data)
}

export const signinAPI =  (data) => {
  return axiosInstance.post('/auth/signin', data)
}

export const logoutAPI =  () => {
  return axiosInstance.post('/auth/logout')
}

export const getUserAPI =  () => {
  return axiosInstance.get('/auth/get-user')
}


