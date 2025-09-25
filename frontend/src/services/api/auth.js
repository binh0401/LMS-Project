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

export const googleSigninBackendAPI =  (data) => {
  return axiosInstance.post('/auth/google/signin', data)
}

export const googleSignupBackendAPI =  (data) => {
  return axiosInstance.post('/auth/google/signup', data)
}

