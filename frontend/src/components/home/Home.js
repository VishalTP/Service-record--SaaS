import React, { useEffect, useRef, useState } from 'react'
import { getAllService } from '../../action/serviceAction'

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './Home.css'

import AllService from '../service/AllService'
import { Button, Form } from 'react-bootstrap'
import { AiFillCaretDown, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Sidebar from '../sidebar/Sidebar'


const Home = () => {
  const { services, serviceCount } = useSelector(state => state.service)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const options = useRef();
  const statusOptions = useRef()

  const [status, setStatus] = useState("")
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)

  const showMenu = (e) => {
    if (e.target.classList.contains("options")) {
      // options.current.classList.toggle("disp")
      statusOptions.current.classList.add("disp")
    }
    else if (e.target.classList.contains("statusOptions")) {
      statusOptions.current.classList.toggle("disp")
      // options.current.classList.add("disp")
    }
    else {
      // options.current.classList.add("disp")
      statusOptions.current.classList.add("disp")
    }
  }

  const searchService = () => {
    setStatus("")
    if (+search) {
      fetchService("", search)
      setSearch("")
    }
    else
      fetchService(search, "")

    // +search? fetchService("", search): fetchService(search, "")
  }

  const fetchService = (name, code) => {
    dispatch(getAllService("", status, name, code, false, page))

  }

  useEffect(() => {
    fetchService()
    document.addEventListener("click", showMenu)
    return () => document.removeEventListener("click", showMenu)
  }, [dispatch, status, page])

  return (
    <>
      <div className="topBar mb-3">
        <Button onClick={() => navigate("/dashboard/service/create")}>Add new</Button>
        {/* <div className="options">
          <button >Select Menu</button>
          <div ref={options}  className="disp">
            <p onClick={()=>navigate('/dashboard/vendor')}>Vendors</p>
            <p onClick={()=>navigate('/dashboard/product/list')}>Product</p>
            <p onClick={()=>navigate('/dashboard/report')}>Reports</p>
            <p onClick={()=>navigate('/dashboard/list/user')}>Staff</p>
            <p onClick={()=>navigate('/dashboard/change-password')}>Change Password</p>
          </div>
        </div> */}

        <div className="statusOptions">
          <button >Status <AiFillCaretDown /></button>
          <div ref={statusOptions} className="disp">
            <p onClick={() => setStatus("")}>All</p>
            <p onClick={() => setStatus("Open")}>Open</p>
            <p onClick={() => setStatus("In Progress")}>In Progress</p>
            <p onClick={() => setStatus("Closed")}>Closed</p>
            <p onClick={() => setStatus("Returned")}>Returned</p>
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


      <AllService services={services} />
      {

      serviceCount > 8 && <div className="pagination">
        <button disabled={page===1} onClick={()=>setPage(page-1)}> <AiOutlineLeft /> </button>
        {page}
        <button onClick={()=>setPage(page+1)} disabled={page === Math.ceil(serviceCount/8)}>
          <AiOutlineRight />
        </button>
      </div>
      }
      <Sidebar />

    </>
  )
}

export default Home