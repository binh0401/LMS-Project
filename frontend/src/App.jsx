import {Route, Routes} from "react-router"
import Home from './pages/home/Home'
import SignInForm from './pages/auth/SignInForm'
import SignUpForm from './pages/auth/SignUpForm'
import useAuth from './hooks/useAuth'
import Box from '@mui/material/Box'
import NotFoundError from "./pages/errors/NotFoundError"
import ProtectedRoute from "./components/shared/ProtectedRoute"
import AuthPage from "./pages/auth/AuthPage"
import Dashboard from './pages/dashboard/Dashboard'
import Logout from './pages/auth/Logout'
import {Spinner} from "./components/ui/shadcn-io/spinner/index"


const App = () => {
  
  const {authState} = useAuth()

  //TODO: Implement this later

  if(authState.isLoading){
    return (
      <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
        <Spinner />
      </Box>
    )
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/callback"/>
      <Route element={<AuthPage />}>
        <Route path="/signin" element={<SignInForm />} />
        <Route path="/signup" element={<SignUpForm />} />
      </Route>
      
      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />}/>
      </Route>

      <Route path="/*" element={<NotFoundError />} />
    </Routes>
  )
}

export default App;