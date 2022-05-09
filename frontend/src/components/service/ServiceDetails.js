import React, { useEffect } from 'react'
import { Button, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { getServiceDetails, updateService } from '../../action/serviceAction'
import DeviceTable from './DeviceTable'
import { jsPDF } from "jspdf";

const ServiceDetails = () => {
    const dispatch = useDispatch()
    const params = useParams()
    const navigate = useNavigate()
    const { service, devices } = useSelector(state => state.service)
    const {success} = useSelector(state=> state.device)

    const updateStatus = (status) => {
        const myForm = new FormData()
        myForm.set("status", status)
        dispatch(updateService(service._id, myForm))
    }

    const doc = new jsPDF();
    const generatePdf = ()=>{

        doc.text(`Customer: ${service.name}`, 10, 10);
        doc.text(`Contact Number: ${service.contactNumber}`, 10, 20);
        doc.text(`Amount: ${service.paidAmount+ service.pendingAmount}`, 10, 30);
        const date = new Date()
        const day = date.getUTCDay(),
              dd = date.getDate(),
              mm = date.getMonth(),
              yy = date.getFullYear()
        doc.text(`Date: ${dd} - ${mm} - ${yy}`, 10, 40);
        doc.save("a4.pdf");
    }

    // useEffect(()=>{
    //     if(!success) return
    // }, [success])
    useEffect(() => {
        dispatch(getServiceDetails(params.id))
    }, [success])
    return (
        <>
            <Card.Body className="cardBody">
                <Link to="/home">Dashboard</Link> / Service Details
            </Card.Body>
            {
                service &&
                <div className="row">
                    <h1>{service.name}</h1>
                    <Card className="col-md-6">
                        <Card.Body>Number: {service.contactNumber}</Card.Body>
                        <Card.Body>Emaiil: {service.email}</Card.Body>
                    </Card>
                    <div className="col-md-6">
                        <Card.Body>Location: {service.location}</Card.Body>
                        <Card.Body>Service Code: {service.serviceCode}</Card.Body>
                        <label>Status</label>
                        <select defaultValue={service.status} onChange={e => updateStatus(e.target.value)}>
                            <option value="Open">Open</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Closed">Closed</option>
                            <option value="Returned">Returned</option>
                        </select>
                    </div>

                    <Card className="col-md-6">
                        <Card.Body>Product: {service.productType}</Card.Body>
                        <Card.Body>Device Details: {service.deviceDetails}</Card.Body>
                    </Card>
                    <Card className="col-md-6">
                        <Card.Body>Assigned to: {service.assignedTo}</Card.Body>
                        <Card.Body>Vendor Code: {service.vendor}</Card.Body>
                    </Card  >

                    <Card className="col-md-6">
                        <Card.Body>Issue: {service.issue}</Card.Body>
                        <Card.Body>Service Details: {service.serviceDetails}</Card.Body>
                        <Card.Body>Date: {service.createdAt}</Card.Body>

                    </Card  >
                    <Card className="col-md-6">
                        <Card.Body>Pending Amount: {service.pendingAmount}</Card.Body>
                        <Card.Body>Paid Amount: {service.paidAmount}</Card.Body>
                        <button onClick={()=>navigate(`/dashboard/service/update/payment/${service._id}`)}>Edit</button>
                    </Card  >

                    <Button onClick={()=>navigate("/dashboard/service/newDevice")}>Add Device</Button>
                    <button onClick={generatePdf}>Print</button>
                </div>
            }
            {
                devices && <DeviceTable devices={devices}/>
            }
        </>
    )
}

export default ServiceDetails