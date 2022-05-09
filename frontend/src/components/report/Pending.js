import React, { useEffect } from 'react'
import { Button, Card, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { getAllService, updateService } from '../../action/serviceAction'

const Pending = () => {

    const { services, success } = useSelector(state => state.service)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const clearAmount = (id, pendingAmount, paidAmount)=>{
        console.log("dsdsd")
        const myForm = new FormData()
        myForm.set("paidAmount", pendingAmount+paidAmount)
        myForm.set("pendingAmount", 0)
        dispatch(updateService(id, myForm))
    }

    useEffect(() => {
        dispatch(getAllService("",'','','', true))
    }, [success])
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
                    {services && services.map((service, i) => 
                    <tr key={service._id}>
                        <td>{i + 1}</td>
                        <td>{service.name}</td>
                        <td>{service.serviceCode}</td>
                        <td style={{ color: "red" }}>Rs {service.pendingAmount}</td>
                        <td>
                            <Button onClick={() => { navigate(`/dashboard/service/${service._id}`) }}> View</Button>
                            <Button variant={"success"} onClick={()=> clearAmount(service._id, service.pendingAmount, service.paidAmount)}>Clear</Button>
                        </td>
                    </tr>
                    )}
                </tbody>
            </Table>
        </>
    )
}

export default Pending