import React, { useEffect, useRef, useState } from 'react'
import { getAllService } from '../../action/serviceAction'

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './Home.css'

import AllService from '../service/AllService'
import { Button, Form } from 'react-bootstrap'



const Home = () => {
  const { services } = useSelector(state => state.service)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const options = useRef();
  const statusOptions = useRef()

  const [status, setStatus] = useState("")
  const [search, setSearch] = useState("")

  const showMenu = (e)=>{
    if(e.target.classList.contains("options")){
        options.current.classList.toggle("disp")
        statusOptions.current.classList.add("disp") 
    }
    else if(e.target.classList.contains("statusOptions")){
      statusOptions.current.classList.toggle("disp")
      options.current.classList.add("disp")
    }
    else{
      options.current.classList.add("disp")
      statusOptions.current.classList.add("disp")
    }
  }

  const searchService = ()=>{
    setStatus("")
    if(+search)
      fetchService("", search)
    else
      fetchService(search, "")

    // +search? fetchService("", search): fetchService(search, "")
  }

  const fetchService = (name, code)=>{
    dispatch(getAllService("", status, name, code))

  }

  useEffect(() => {
    fetchService()
    document.addEventListener("click", showMenu)
    return ()=> document.removeEventListener("click", showMenu)
  }, [dispatch, status])

  return (
    <div className="">
      <div className="topBar">
        <button onClick={() => navigate("/dashboard/service/create")}>Add new</button>
        <div className="options">
          <button >Select Menu</button>
          <div ref={options}  className="disp">
            <p onClick={()=>navigate('/dashboard/vendor')}>Vendors</p>
            <p onClick={()=>navigate('/dashboard/product/list')}>Product</p>
            <p onClick={()=>navigate('/dashboard/report')}>Reports</p>
            <p onClick={()=>navigate('/dashboard/list/user')}>Staff</p>
            <p onClick={()=>navigate('/dashboard/change-password')}>Change Password</p>
          </div>
        </div>

        <div className="statusOptions">
          <button >Status</button>
          <div ref={statusOptions}  className="disp">
            <p onClick={()=>setStatus("")}>All</p>
            <p onClick={()=>setStatus("Open")}>Open</p>
            <p onClick={()=>setStatus("In Progress")}>In Progress</p>
            <p onClick={()=>setStatus("Closed")}>Closed</p>
            <p onClick={()=>setStatus("Returned")}>Returned</p>
          </div>
        </div>
        <div className="search">
          <Form.Control 
            type="text" 
            placeholder=" Name/ Service code" 
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <Button variant="outline-primary" onClick={searchService}>Search</Button>
        </div>
        
      </div>

      
      <AllService services={services}/>



    </div>
  )
}

export default Home