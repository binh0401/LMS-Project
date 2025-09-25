import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import {BrowserRouter} from "react-router"
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import './index.css'
import {GoogleOAuthProvider} from '@react-oauth/google'




createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <ThemeProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </ThemeProvider>
      </GoogleOAuthProvider>
    </BrowserRouter>
)
