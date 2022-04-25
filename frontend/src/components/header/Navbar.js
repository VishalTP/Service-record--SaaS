import React, { useEffect, useState } from 'react'
import './Navbar.css'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../../action/userAction'
import {useNavigate} from 'react-router-dom'

const Navbar = () => {

    // const [state, setState] = useState("")   

    // const getUser = async ()=>{
    //     let data = await axios("/api/v1/admin/service/625c22fececd430c92684b95")
    //     console.log(data)
    // }
    const dispatch = useDispatch()
    const {isAuthenticated} = useSelector(state=>state.user)
    const navigate = useNavigate()

    const handleLogout = ()=>{
        dispatch(logoutUser())
    }
    
    useEffect(() => {
        if(isAuthenticated===false)
            navigate("/")
        
        // getUser()
    }, [isAuthenticated])

    return (
        <nav className="navBar">
            <div className="logo">
                <p>Service Record</p>
            </div>
            <p className="mid">Service Dashboard</p>
            <div className="right d-flex">
                <p>Hi User</p>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </nav>
    )
}

export default Navbar