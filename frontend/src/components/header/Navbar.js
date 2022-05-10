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
    const {isAuthenticated, user} = useSelector(state=>state.user)
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
        <nav className="navBar mb-3">
            <div className="logo">
                <p>Service Record</p>
            </div>
            <p>Hello {user.name}</p>             
            <button onClick={handleLogout}>Logout</button>
        </nav >
    )
}

export default Navbar