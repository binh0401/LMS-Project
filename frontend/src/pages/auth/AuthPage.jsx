import { Outlet, useLocation } from 'react-router'
import SignInForm from './SignInForm'
import SignUpForm from './SignUpForm'

const AuthPage = () => {
  const location = useLocation()
  const isSignIn = location.pathname.endsWith('/signin')

  return (
    <>
      General Auth Page 
      <Outlet />
    </>
  )
}

export default AuthPage