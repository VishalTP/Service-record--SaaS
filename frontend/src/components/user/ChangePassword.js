import React, { useEffect, useState } from 'react'
import { Form, Button, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { updatePassword } from '../../action/userAction'

const ChangePassword = () => {


    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { success } = useSelector(state => state.user)
    const [password, setPassword] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        const myForm = new FormData()
        myForm.set("oldPassword", password.oldPassword)
        myForm.set("newPassword", password.newPassword)
        myForm.set("confirmPassword", password.confirmPassword)

        dispatch(updatePassword(myForm))
    }

    useEffect(() => {
        if (success)
            navigate("/home")

    }, [success])

    return (
        <>
            <Card.Body className="cardBody">
                <Link to="/home">Dashboard</Link> / Change Password
            </Card.Body>
            <div>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Old Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={password.oldPassword}
                            onChange={e => setPassword({ ...password, oldPassword: e.target.value })}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={password.newPassword}
                            onChange={e => setPassword({ ...password, newPassword: e.target.value })}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={password.confirmPassword}
                            onChange={e => setPassword({ ...password, confirmPassword: e.target.value })}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Form>

            </div>
        </>
    )
}

export default ChangePassword