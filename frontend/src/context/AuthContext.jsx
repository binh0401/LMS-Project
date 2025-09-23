import { createContext, useReducer, useEffect } from "react";
import authReducer from "../reducers/authReducer";
import { signinAPI, signupAPI, getUserAPI, logoutAPI } from "../services/api/auth";

const initialAuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, initialAuthState);

  useEffect(() => {
    getUser();
  }, []);

  const signup = async ({ name, dob, gender, role, email, password }) => {
    try {
      const data = await signupAPI({ name, dob, gender, role, email, password });

      console.log(data)

      localStorage.setItem("token", data.token);

      dispatch({
        type: "SIGNUP_SUCCESS",
        payload: {
          name: data.name,
          dob: data.dob,
          gender: data.gender,
          role: data.role,
          email: data.email,
          userId: data.userId,
          createdAt: data.createdAt,
        },
      });
    } catch (err) {
      console.error("❌ signup error:", err.response?.data || err.message);
      dispatch({
        type: "SIGNUP_ERROR",
        payload: err.response?.data?.message,
      });
    }
  };

  const signin = async ({ email, password }) => {
    try {
      const data = await signinAPI({ email, password });
      console.log("✅ signin response:", data);

      localStorage.setItem("token", data.token);

      dispatch({
        type: "SIGNIN_SUCCESS",
        payload: {
          name: data.name,
          dob: data.dob,
          gender: data.gender,
          role: data.role,
          email: data.email,
          userId: data.userId,
          createdAt: data.createdAt,
        },
      });
    } catch (err) {
      console.error("❌ signin error:", err.response?.data || err.message);
      dispatch({
        type: "SIGNIN_ERROR",
        payload: err.response?.data?.message,
      });
    }
  };

  const getUser = async () => {
    try {
      const data = await getUserAPI();
      console.log(data)

      dispatch({
        type: "GET_USER_SUCCESS",
        payload: {
          name: data.name,
          dob: data.dob,
          gender: data.gender,
          role: data.role,
          email: data.email,
          userId: data.userId,
          createdAt: data.createdAt,
        },
      });
    } catch (err) {
      console.error("❌ getUser error:", err.response?.data || err.message);
      dispatch({
        type: "GET_USER_ERROR",
        payload: err.response?.data?.message,
      });
    }
  };

  const logout = async () => {
    try {
      //TODO: implement logoutAPI
      //await logoutAPI();
      localStorage.removeItem("token");
      dispatch({ type: "LOGOUT_SUCCESS" });
    } catch (err) {
      console.error("❌ logout error:", err.response?.data || err.message);
    }
  };

  const AuthContextData = {
    authState,
    signin,
    signup,
    getUser,
    logout,
  };

  return (
    <AuthContext.Provider value={AuthContextData}>
      {children}
    </AuthContext.Provider>
  );
};
