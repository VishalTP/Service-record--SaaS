import React, { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { createNewDevice } from '../../action/serviceAction'
import { getAllVendors } from '../../action/vendorAction'
import serviceActionType from '../../actionTypes/serviceActionType'

const NewDevice = () => {
    const { service } = useSelector(state => state.service)
    const { vendors } = useSelector(state => state.vendor)
    const {success} = useSelector(state=>state.device)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [form, setForm] = useState({
        name: "",
        sNumber: "",
        warranty: "",
        vendor: "",
        amount: 0
    })

    const submitForm = e => {
        e.preventDefault()

        const myForm = new FormData()
        myForm.set("name", form.name)
        myForm.set("serialNo", form.sNumber)
        myForm.set("warranty", form.warranty)
        myForm.set("vendor", form.vendor)
        myForm.set("amount", form.amount)
        myForm.set("service", service._id)

        dispatch(createNewDevice(myForm))

    }

    useEffect(()=>{
        dispatch(getAllVendors())
    }, [])

    useEffect(()=>{
        if(!success) return

        dispatch({type: serviceActionType.NEW_DEVICE_RESET})
        navigate(`/dashboard/service/${service._id}`)
    }, [success])

    return (
        <div>

            <Form className="" onSubmit={submitForm}>
                <Form.Group className="col-md-4" controlId="validationFormik02" >
                    <Form.Label>Device</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                    />
                </Form.Group>
                <Form.Group className="col-md-4" controlId="validationFormik02" >
                    <Form.Label>Serial Number</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        value={form.sNumber}
                        onChange={e => setForm({ ...form, sNumber: e.target.value })}
                    />
                </Form.Group>
                <Form.Group className="col-md-4">
                    <Form.Label>Warranty Period</Form.Label>
                    <Form.Control
                        type="number"
                        value={form.warranty}
                        onChange={e => setForm({ ...form, warranty: e.target.value })}
                        required
                    />
                </Form.Group>
                <Form.Group className="col-md-6" controlId="exampleForm.ControlInput1">
                    <Form.Label>Vendor</Form.Label>
                    <Form.Select
                        required
                        aria-label="Default select example"
                        value={form.vendor}
                        onChange={e => setForm({ ...form, vendor: e.target.value })}
                    >
                        <option value="">---------</option>
                        {
                            vendors && vendors.map(vendor =>
                                <option key={vendor._id} value={vendor.name}>{vendor.name}</option>
                            )
                        }

                    </Form.Select>
                </Form.Group>
                <Form.Group className="col-md-4" controlId="validationFormik02" >
                    <Form.Label>Device Amount</Form.Label>
                    <Form.Control
                        required
                        type="number"
                        value={form.amount}
                        onChange={e => setForm({ ...form, amount: e.target.value })}
                    />
                </Form.Group>
                <Button type="submit" >Submit</Button>
            </Form>

        </div>
    )
}

export default NewDevice