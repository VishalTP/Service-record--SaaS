import { Button } from 'react-bootstrap'
import React from 'react'
import { useNavigate } from 'react-router'

const VendorCard = ({_id, name, contactPerson, contactNumber, location}) => {
  const navigate = useNavigate()
  return (
    <tr>
        <td>{name}</td>
        <td>{contactPerson}</td>
        <td>{contactNumber}</td>
        <td>{location}</td>
        <td><Button variant="warning" onClick={()=>navigate(`clients/${name}`)}>Client</Button></td>
        <td><Button onClick={()=>navigate(`update/${_id}`)}>Edit</Button></td>     
    </tr>
  )
}

export default VendorCard