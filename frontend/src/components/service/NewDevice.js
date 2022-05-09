import React, { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { createNewDevice, getDeviceDetails, updateDevice, updateService } from '../../action/serviceAction'
import { getAllVendors } from '../../action/vendorAction'
import serviceActionType from '../../actionTypes/serviceActionType'

const NewDevice = () => {
    const { service } = useSelector(state => state.service)
    const { vendors } = useSelector(state => state.vendor)
    const {loading, success, device} = useSelector(state=>state.device)
    const [prevAmt, setPrevAmt] = useState(0)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

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
        
        params.id ? dispatch(updateDevice(myForm, device._id)) : dispatch(createNewDevice(myForm))

    }

    const updatePendingAmount = ()=>{
        console.log(prevAmt)
        dispatch(updateService(service._id, {"pendingAmount": service.pendingAmount-prevAmt+(+device.amount)}))
    }

    useEffect(()=>{
        if(success || device===null) return
        if(params.id){
            console.log(device)
            if(!device){
                dispatch(getDeviceDetails(params.id))

            }
            else{
                setPrevAmt(device.amount)
                setForm({
                    name: device.name,
                    sNumber: device.serialNo,
                    warranty: device.warranty,
                    vendor: device.vendor,
                    amount: device.amount
                })
            }
        }
        dispatch(getAllVendors())
    }, [device])

    useEffect(()=>{
        if(!success) return
        console.log("2nd")
        updatePendingAmount()
        dispatch({type: serviceActionType.NEW_DEVICE_RESET})
        navigate(`/dashboard/service/${service._id}`)
    }, [success])

    return (
        <div>

            <Form className="" onSubmit={e=> submitForm(e)}>
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