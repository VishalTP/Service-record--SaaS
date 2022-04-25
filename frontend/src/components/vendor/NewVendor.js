import React, { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { addVendor, getVendor, updateVendor } from '../../action/vendorAction'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'

const NewVendor = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
    const {success, vendor} = useSelector(state=>state.vendor)
    const [vendorDetails, setVendorDetails] = useState({
        name: "",
        contactPerson: "",
        contactNumber: "",
        email: "",
        location: ""
    })

    const handleSubmit = (e)=>{
        e.preventDefault()
        const myForm = new FormData()
        myForm.set("name", vendorDetails.name)
        myForm.set("contactPerson", vendorDetails.contactPerson)
        myForm.set("contactNumber", vendorDetails.contactNumber)
        myForm.set("email", vendorDetails.email)
        myForm.set("location", vendorDetails.location)
        if(params.id)
            dispatch(updateVendor(myForm, params.id))
        else
            dispatch(addVendor(myForm))
    }

    useEffect(()=>{
        if(success){
            navigate("/dashboard/vendor")
            return
        }
        if(params.id){
            dispatch(getVendor(params.id))
        }
    }, [success])

    useEffect(()=>{
        if(!vendor) return
        setVendorDetails({
            name: vendor.name,
            contactPerson: vendor.contactPerson,
            contactNumber: vendor.contactNumber,
            email: vendor.email,
            location: vendor.location
        })
    }, [vendor])

    return (
        <Form className="row">
            <Form.Group className="col-md-4">
                <Form.Label>Name</Form.Label>
                <Form.Control 
                    type="text" 
                    value={vendorDetails.name}
                    onChange = {e => setVendorDetails({...vendorDetails, name: e.target.value})}
                />
            </Form.Group>

            <Form.Group className="col-md-4">
                <Form.Label>Contact Person</Form.Label>
                <Form.Control 
                    type="text" 
                    value={vendorDetails.contactPerson} 
                    onChange = {e => setVendorDetails({...vendorDetails, contactPerson: e.target.value})}
                />
            </Form.Group>

            <Form.Group className="col-md-4">
                <Form.Label>Contact Number</Form.Label>
                <Form.Control 
                    type="number" 
                    value={vendorDetails.contactNumber} 
                    onChange = {e => setVendorDetails({...vendorDetails, contactNumber: e.target.value})}
                />
            </Form.Group>

            <Form.Group className="col-md-6">
                <Form.Label>Email</Form.Label>
                <Form.Control 
                    type="email" 
                    value={vendorDetails.email} 
                    onChange = {e => setVendorDetails({...vendorDetails, email: e.target.value})}
                />
            </Form.Group>

            <Form.Group className="col-md-6">
                <Form.Label>Location</Form.Label>
                <Form.Control 
                    type="text" 
                    value={vendorDetails.location} 
                    onChange = {e => setVendorDetails({...vendorDetails, location: e.target.value})}
                />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={handleSubmit}>
                Submit
            </Button>
        </Form>
    )
}

export default NewVendor