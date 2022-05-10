import React from 'react'
import { useNavigate } from 'react-router'
import './sidebar.css'

const Sidebar = () => {

    const navigate = useNavigate()

  return (
    <div className="sidebar">
        <button className="title" onClick={()=>navigate('/home')}>
            Dashboard
        </button>
        <button onClick={()=>navigate('/dashboard/vendor')}>
            Vendors
        </button>
        <button onClick={()=>navigate('/dashboard/product/list')}>
            Products
        </button>
        <button onClick={()=>navigate('/dashboard/report')}>
            Report
        </button>
        <button onClick={()=>navigate('/dashboard/list/user')}>
            Staffs
        </button>
        <button onClick={()=>navigate('/dashboard/change-password')}>
            Change Password
        </button>
    </div>
  )
}

export default Sidebar