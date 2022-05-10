import React, { useEffect, useRef, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { loginUser } from '../../action/userAction'
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import './user.css'

const UserLogin = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [type, setType] = useState("password")
    const {isAuthenticated} = useSelector(state=>state.user)
    const pass = useRef()

    const [login, setLogin] = useState({
        userName: "admin",
        password: "111111111"
    })

    const handleSubmit = (e)=>{
        e.preventDefault()
        const myForm = new FormData()
        myForm.set("name", login.userName)
        myForm.set("password", login.password)

        dispatch(loginUser(myForm))
    }
    
    const showPassword = ()=>{
        pass.current.type==="password" ? setType("text"): setType("password")
    }
    
    useEffect(()=>{
        if(isAuthenticated)
            navigate("/home")
        else
            pass.current.type=type

    }, [isAuthenticated, type])

  return (
    <div className="loginUser">
        <h2 className="mb-4">Service Record</h2>
       <Form>
            <Form.Group className="mb-4">
                <Form.Label>Username:</Form.Label>
                <Form.Control 
                    type="text" 
                    value={login.userName}
                    onChange = {e => setLogin({...login, userName: e.target.value})}
                />
            </Form.Group>

            <Form.Group className="mb-4 loginIntput">
                <Form.Label>Password:</Form.Label>
                <Form.Control 
                    type="password" 
                    value={login.password} 
                    onChange = {e => setLogin({...login, password: e.target.value})}
                    ref={pass}
                />
                <div className="svg" onClick={showPassword}>
                    {
                       type==="password" ? <AiFillEye /> : <AiFillEyeInvisible />
                    }
                    
                </div>
            </Form.Group>

            <Button variant="primary" type="submit" onClick={handleSubmit} className="button mt-4">
                Login
            </Button>
        </Form> 
    </div>
  )
}

export default UserLogin