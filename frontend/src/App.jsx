import {Route, Routes} from "react-router"
import Home from './pages/home/Home'
import SignIn from './pages/auth/SignIn'
import SignUp from './pages/auth/SignUp'
import useAuth from './hooks/useAuth'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import NotFoundError from "./pages/errors/NotFoundError"
import ProtectedRoute from "./components/shared/ProtectedRoute"


const App = () => {
  
  const {authState} = useAuth()

  //TODO: Implement this later

  // if(authState.isLoading){
  //   return (
  //     <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
  //       <CircularProgress />
  //     </Box>
  //   )
  // }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        
      </Route>

      <Route path="/*" element={<NotFoundError />} />
    </Routes>
  )
}

export default App;