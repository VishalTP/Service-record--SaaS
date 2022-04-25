import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import {registerUser} from '../../action/userAction'

const NewUser = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    })

    const handleSubmit = (e)=>{
        e.preventDefault()
        const myForm = new FormData()
        myForm.set("name", user.name)
        myForm.set("email", user.email)
        myForm.set("password", user.password)

        dispatch(registerUser(myForm))
        navigate("/dashboard/list/user")
    }

    return (
        <Form>
            <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Enter Username" 
                    value={user.name}
                    onChange = {e => setUser({...user, name: e.target.value})}
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control 
                    type="email" 
                    placeholder="Enter email" 
                    value={user.email} 
                    onChange = {e => setUser({...user, email: e.target.value})}
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                    type="password" 
                    placeholder="Password" 
                    value={user.password} 
                    onChange = {e => setUser({...user, password: e.target.value})}
                />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={handleSubmit}>
                Submit
            </Button>
        </Form>
    )
}

export default NewUser