import React, { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { loginUser } from '../../action/userAction'

const UserLogin = () => {


    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {isAuthenticated} = useSelector(state=>state.user)
    const [login, setLogin] = useState({
        userName: "",
        password: ""
    })

    const handleSubmit = (e)=>{
        e.preventDefault()
        const myForm = new FormData()
        myForm.set("name", login.userName)
        myForm.set("password", login.password)

        dispatch(loginUser(myForm))
    }
    
    useEffect(()=>{
        if(isAuthenticated)
            navigate("/home")

    }, [isAuthenticated])

  return (
    <div>
       <Form>
            <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control 
                    type="text" 
                    value={login.userName}
                    onChange = {e => setLogin({...login, userName: e.target.value})}
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                    type="password" 
                    value={login.password} 
                    onChange = {e => setLogin({...login, password: e.target.value})}
                />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={handleSubmit}>
                Submit
            </Button>
        </Form> 
    </div>
  )
}

export default UserLogin