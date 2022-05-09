import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router'

const ProtectedRoute = ({children}) => {
    const {loading, isAuthenticated} = useSelector(state=>state.user)
    const navigate = useNavigate()
    useEffect(()=>{
      if(!isAuthenticated) 
        navigate("/")
    }, [isAuthenticated])
  return (
    <>
    {
        loading===false && isAuthenticated ? children : ""
    }
    </>
  )
}

export default ProtectedRoute