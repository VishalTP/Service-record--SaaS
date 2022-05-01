import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getServiceDetails, updateService } from '../../action/serviceAction'
import { Form, Button, Card } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router'
import { Link } from 'react-router-dom'

const UpdatePayment = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()
  const { success, service } = useSelector(state => state.service)
  const [form, setForm] = useState({
    issue: "",
    service: "",
    paidAmt: "",
    pendingAmt: ""
  })

  const updateDetails = (e) => {
    e.preventDefault()
    const myForm = new FormData()
    myForm.set("issue", form.issue)
    myForm.set("serviceDetails", form.service)
    myForm.set("paidAmount", form.paidAmt)
    myForm.set("pendingAmount", form.pendingAmt)
    dispatch(updateService(service._id, myForm))
  }

  useEffect(() => {
    if (success)
      navigate(`/dashboard/service/${service._id}`)
    dispatch(getServiceDetails(params.id))
    if (service)
      setForm({
        issue: service.issue,
        service: service.serviceDetails,
        paidAmt: service.paidAmount,
        pendingAmt: service.pendingAmount
      })
  }, [success])
  return (
    <>
        <Card.Body className="cardBody">
            <Link to="/home">Dashboard</Link> / {service && <Link to={`/dashboard/service/${service._id}`}>Service Details</Link>} / Device Issue
          </Card.Body>
      {
            service && <>
          <div className="row">
            <Form.Group className="col-md-6" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Issue Details</Form.Label>
              <Form.Control
                required
                as="textarea"
                rows={3}
                value={form.issue}
                onChange={(e) => setForm({ ...form, issue: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="col-md-6 col-xs-12" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Service Details</Form.Label>
              <Form.Control
                required
                as="textarea"
                rows={3}
                value={form.service}
                onChange={(e) => setForm({ ...form, service: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="col-md-6" >
              <Form.Label>Paid Amount</Form.Label>
              <Form.Control
                required
                type="number"
                value={form.paidAmt}
                onChange={(e) => setForm({ ...form, paidAmt: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="col-md-6" >
              <Form.Label>Pending Amount</Form.Label>
              <Form.Control
                required
                type="number"
                value={form.pendingAmt}
                onChange={(e) => setForm({ ...form, pendingAmt: e.target.value })}
              />
            </Form.Group>
            <Button type="submit" onClick={updateDetails}>Submit</Button>
          </div>
        </>
      }
    </>
  )
}

export default UpdatePayment