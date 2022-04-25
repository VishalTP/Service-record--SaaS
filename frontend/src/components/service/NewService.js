import React, { useEffect, useState } from 'react'
import { Form, Card, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { getAllProducts } from '../../action/productAction';
import { createNewService } from '../../action/serviceAction';
import { getAllUser } from '../../action/userAction';
import { getAllVendors } from '../../action/vendorAction';
import './NewService.css'

const NewService = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {products} = useSelector(state=>state.product)
  const {vendors} = useSelector(state=>state.vendor)
  const {staffs} = useSelector(state=>state.staff)
  const [validated, setValidated] = useState(false);
  
  const [form, setForm] = useState({
    name: "",
    cNumber: "",
    email: "",
    code: "",
    status: "",
    product: "",
    sNumber: "",
    location: "",
    assignTo: "",
    vendor: "",
    issue: "",
    device: ""
  })

  
  const submitForm = (e) => {
    e.preventDefault();
    const _form = e.currentTarget;
    if (_form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      console.log("haha")
      const myForm = new FormData()
      myForm.set("name", form.name)
      myForm.set("contactNumber", form.cNumber)
      myForm.set("email", form.email)
      myForm.set("serviceCode", form.code)
      myForm.set("status", form.status)
      myForm.set("productType", form.product)
      myForm.set("serialNumber", form.sNumber)
      myForm.set("location", form.location)
      myForm.set("assignedTo", form.assignTo)
      myForm.set("vendor", form.vendor)
      myForm.set("issue", form.issue)
      myForm.set("deviceDetails", form.device)
      dispatch(createNewService(myForm))
      navigate("/home")
    }
    
    setValidated(true);
  };
  
  useEffect(() => {
    dispatch(getAllProducts())
    dispatch(getAllVendors())
    dispatch(getAllUser())

  }, [])
  
  return (
    <>
      <Card>
        <Card.Body className="cardBody"><Link to="/home">Dashboard</Link> / New Service</Card.Body>
      </Card>
      <Form noValidate validated={validated} className="row" onSubmit={submitForm}>
        <Form.Group className="col-md-4" controlId="validationFormik02" >
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            type="text"
            value={form.name}
            onChange={(e) => { setForm({ ...form, name: e.target.value }) }}
            feedback="You must agree before submitting."
          />
        </Form.Group>
        <Form.Group className="col-md-4">
          <Form.Label>Contact Number</Form.Label>
          <Form.Control
            type="number"
            value={form.cNumber}
            onChange={(e) => { setForm({ ...form, cNumber: e.target.value }) }}
            required
          />
        </Form.Group>
        <Form.Group className="col-md-4" controlId="exampleForm.ControlInput1">
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="name@example.com"
            value={form.email}
            onChange={(e) => { setForm({ ...form, email: e.target.value }) }}
          />
        </Form.Group>

        <Form.Group className="col-md-6" controlId="exampleForm.ControlInput1">
          <Form.Label>Service Code</Form.Label>
          <Form.Control
            required
            type="number"
            value={form.code}
            onChange={(e) => { setForm({ ...form, code: e.target.value }) }}
          />
        </Form.Group>
        <Form.Group className="col-md-6" controlId="exampleForm.ControlInput1">
          <Form.Label>Status</Form.Label>
          <Form.Select
            required
            aria-label="Default select example"
            value={form.status}
            onChange={(e) => { setForm({ ...form, status: e.target.value }) }}
          >
            <option value="">---------</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Closed">Closed</option>
            <option value="Return">Return</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="col-md-4" >
          <Form.Label>Product Type</Form.Label>
          <Form.Select
            required
            value={form.product}
            onChange={(e) => { setForm({ ...form, product: e.target.value }) }}
          >
            <option value="">---------</option>
            {
              
              products && products.map(product => <option key={product._id} value={product.name}>{product.name}</option>)
            }

          </Form.Select>
        </Form.Group>
        <Form.Group className="col-md-4">
          <Form.Label>Serial Number</Form.Label>
          <Form.Control
            required
            type="text"
            value={form.sNumber}
            onChange={(e) => { setForm({ ...form, sNumber: e.target.value }) }}
          />
        </Form.Group>
        <Form.Group className="col-md-4" >
          <Form.Label>Location</Form.Label>
          <Form.Control
            required
            type="text"
            value={form.location}
            onChange={(e) => { setForm({ ...form, location: e.target.value }) }}
          />
        </Form.Group>

        <Form.Group className="col-md-6" controlId="exampleForm.ControlInput1">
          <Form.Label>Assigned to</Form.Label>
          <Form.Select
            required
            aria-label="Default select example"
            value={form.assignTo}
            onChange={(e) => { setForm({ ...form, assignTo: e.target.value }) }}
          >
            <option value="">---------</option>
            {
              staffs && staffs.map(staff=><option key={staff._id} value={staff.name}>{staff.name}</option>)
            }
          </Form.Select>
        </Form.Group>
        <Form.Group className="col-md-6" controlId="exampleForm.ControlInput1">
          <Form.Label>Vendor</Form.Label>
          <Form.Select
            required
            aria-label="Default select example"
            value={form.vendor}
            onChange={(e) => { setForm({ ...form, vendor: e.target.value }) }}
          >
            <option value="">---------</option>
            {
              vendors && vendors.map(vendor=>
                <option key={vendor._id} value={vendor.name}>{vendor.name}</option>
              )
            }
            
          </Form.Select>
        </Form.Group>

        <Form.Group className="col-md-6" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Issue Details</Form.Label>
          <Form.Control
            required
            as="textarea"
            rows={3}
            value={form.issue}
            onChange={(e) => { setForm({ ...form, issue: e.target.value }) }}
          />
        </Form.Group>
        <Form.Group className="col-md-6 col-xs-12" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Device Details</Form.Label>
          <Form.Control
            required
            as="textarea"
            rows={3}
            value={form.device}
            onChange={(e) => { setForm({ ...form, device: e.target.value }) }}
          />
        </Form.Group>
        <Button type="submit" >Submit</Button>
      </Form>
    </>
  )
}

export default NewService