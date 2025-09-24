import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const useAuth = () => {
  
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error('🗣️ useAuth hook used without AuthContext!');
  }

  return value;
}

export default useAuth
