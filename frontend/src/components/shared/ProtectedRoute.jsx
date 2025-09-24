import React from 'react'
import useAuth from '../../hooks/useAuth'
import { Outlet, Navigate } from 'react-router'

const ProtectedRoute = () => {
  const {authState} = useAuth()

  return (
    <>
      {authState.isAuthenticated ? <Outlet /> : <Navigate to="/signin" />}
    </>
  )
}

export default ProtectedRoute
