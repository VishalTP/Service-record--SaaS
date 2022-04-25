import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'

const ProtectedRoute = ({children}) => {
    const {loading, isAuthenticated} = useSelector(state=>state.user)
  return (
    <>
    {
        loading===false && isAuthenticated === false ? <Navigate to="/"/> : children
    }
    </>
  )
}

export default ProtectedRoute