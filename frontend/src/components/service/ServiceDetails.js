import React, { useEffect } from 'react'
import { Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { getServiceDetails } from '../../action/serviceAction'

const ServiceDetails = () => {
    const dispatch = useDispatch()
    const params = useParams()
    const { service } = useSelector(state => state.service)

    useEffect(() => {
        dispatch(getServiceDetails(params.id))
    }, [])
    return (
        <>
            {
               service && 
                <div className="row">
                    <h1>{service.name }</h1>
                    <Card className="col-md-6">
                        <Card.Body>Number: {service.contactNumber}</Card.Body>
                        <Card.Body>Emaiil: {service.email}</Card.Body>
                    </Card>
                    <div className="col-md-6">
                        <Card.Body>Location: {service.location}</Card.Body>
                        <Card.Body>Service Code: {service.serviceCode}</Card.Body>
                    </div>

                    <Card className="col-md-6">
                        <Card.Body>Product: {service.productType}</Card.Body>
                        <Card.Body>Device Details: {service.deviceDetails}</Card.Body>
                    </Card>
                    <Card className="col-md-6">
                        <Card.Body>Assigned to: {service.assignedTo}</Card.Body>
                        <Card.Body>Vendor Code: {service.vendor}</Card.Body>
                    </Card  >

                </div>
            }
        </>
    )
}

export default ServiceDetails