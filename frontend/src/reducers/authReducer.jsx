
const authReducer = (state, action) => {
  const {type, payload} = action
  switch(type){
    case 'SIGNUP_SUCCESS':
      return {
        ...state,
        user: payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      }
    case 'SIGNUP_ERROR':
      return {
        ...state,
        error: payload,
        isLoading: false,
      }
    case 'SIGNIN_SUCCESS':
      return {
        ...state,
        user: payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      }
    case 'SIGNIN_ERROR':
      return {
        ...state,
        error: payload,
        isLoading: false,
      }
    case 'GET_USER_SUCCESS':
      return {
        ...state,
        user: payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      }
    case 'GET_USER_ERROR':
      return {
        ...state,
        error: payload,
        isLoading: false,
      }
      default:
        return state
  }
    
  
}

export default authReducer