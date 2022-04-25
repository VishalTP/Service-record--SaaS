import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router'

const ServiceCard = ({_id ,slNo, name, productType, serviceCode, status, assignedTo, createdAt}) => {

  const navigate = useNavigate()

  return (
    <tr>
        <td>{slNo}</td>
        <td>{name}</td>
        <td>{productType}</td>
        <td>{serviceCode}</td>
        <td>{status}</td>
        <td>{assignedTo}</td>
        <td>{createdAt}</td>
        <td><Button onClick={()=>navigate(`/dashboard/service/${_id}`)}>View</Button></td>     
    </tr>
  )
}

export default ServiceCard