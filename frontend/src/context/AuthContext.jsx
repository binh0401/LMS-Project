import { createContext, useReducer, useEffect } from "react";
import authReducer from "../reducers/authReducer";
import { signinAPI, signupAPI, getUserAPI, logoutAPI } from "../services/api/auth";

const initialAuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null
}

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {

  const [authState, dispatch] = useReducer(authReducer, initialAuthState)

  useEffect(() => {
    getUser()
  }, [])

  const signup = ({
    name,
    dob,
    gender,
    role,
    email,
    password
  }) => {
    signupAPI({
      name,
      dob,
      gender,
      role,
      email,
      password
    }).then(res => {
      localStorage.setItem('token', res.data.token)
      dispatch({
        type: 'SIGNUP_SUCCESS',
        payload: {
          name: res.data.name,
          dob: res.data.dob,
          gender: res.data.gender,
          role: res.data.role,
          email: res.data.email,
          userId: res.data.userId,
          createdAt: res.data.createdAt
        }
      })
    }).catch(err => {
      dispatch({
        type: 'SIGNUP_ERROR',
        payload: err.response?.data?.message
      })
    })
  }

  const signin = ({
    email,
    password
  }) => {
    signinAPI({
      email,
      password
    }).then(res => {
      localStorage.setItem('token', res.data.token)
      dispatch({
        type: 'SIGNIN_SUCCESS',
        payload: {
          name: res.data.name,
          dob: res.data.dob,
          gender: res.data.gender,
          role: res.data.role,
          email: res.data.email,
          userId: res.data.userId,
          createdAt: res.data.createdAt
        }
      })
    }).catch(err => {
      dispatch({
        type: 'SIGNIN_ERROR',
        payload: err.response?.data?.message
      })
    })
  }

  const getUser = () => {
    getUserAPI().then(res => {
      dispatch({
        type: 'GET_USER_SUCCESS',
        payload: {
          name: res.data.name,
          dob: res.data.dob,
          gender: res.data.gender,
          role: res.data.role,
          email: res.data.email,
          userId: res.data.userId,
          createdAt: res.data.createdAt
        }
      })
    }).catch(err => {
      dispatch({
        type: 'GET_USER_ERROR',
        payload: err.response?.data?.message
      })
    })
  }

  const logout = () => {
    
  }


  const AuthContextData = {
    //User auth state
    authState,

    //Auth Actions
    signin,
    signup,
    getUser,
    logout,
  }
  return (
    <AuthContext.Provider value={AuthContextData}>
      {children}
    </AuthContext.Provider>
  )
}




