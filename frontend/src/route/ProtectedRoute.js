import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router'
import Loading from '../components/spinner/Spinner'

const ProtectedRoute = ({ children }) => {
  const { loading, isAuthenticated } = useSelector(state => state.user)
  const navigate = useNavigate()
  useEffect(()=>{
    console.log("l: ",loading)
    console.log("A: ",isAuthenticated)

  }, [])
  return (
    <>
      {
        loading ? <Loading />: 
        <>
        {isAuthenticated==false  ? <Navigate to="/" /> : children}
        </>
      }
    </>
  )
}

export default ProtectedRoute