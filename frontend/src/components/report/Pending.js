import React, { useEffect } from 'react'
import { Button, Card, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { getAllService } from '../../action/serviceAction'

const Pending = () => {

    const { services } = useSelector(state => state.service)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getAllService())
    }, [])
    return (
        <>
            <Card>
                <Card.Body className="cardBody">
                    <Link to="/home">Dashboard</Link> / <Link to="/dashboard/report">Report</Link> / Pending Amount
                </Card.Body>
            </Card>
            <Table striped >
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Service Code</th>
                        <th>Pending Amount</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {services && services.map((service, i) => <tr key={service._id}>
                        <td>{i + 1}</td>
                        <td>{service.name}</td>
                        <td>{service.serviceCode}</td>
                        <td style={{ color: "red" }}>Rs {service.pendingAmount}</td>
                        <td>
                            <Button onClick={() => { navigate(`/dashboard/service/${service._id}`) }}> View</Button>
                            <Button variant={"success"}>Clear</Button>
                        </td>
                    </tr>)}
                </tbody>
            </Table>
        </>
    )
}

export default Pending