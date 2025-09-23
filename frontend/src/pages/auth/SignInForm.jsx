import React from 'react'
import { useForm } from 'react-hook-form'
import useAuth from '../../hooks/useAuth'


const SignInForm = () => {

  const {register, handleSubmit, formState: {errors}} = useForm()
  const {signin} = useAuth()

  const onSubmit = (data) => {
    signin(data)
  }

  
  return (
    <div>
      SignInForm
    </div>
  )
}

export default SignInForm
