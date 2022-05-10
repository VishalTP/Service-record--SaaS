import React from 'react'
import { useNavigate } from 'react-router'
import { GrView } from "react-icons/gr";

const ServiceCard = ({_id ,slNo, name, productType, serviceCode, status, assignedTo, createdAt}) => {

  const navigate = useNavigate()

  return (
    <tr className="serviceTr">
        <td>{slNo}</td>
        <td>{name}</td>
        <td>{productType}</td>
        <td>{serviceCode}</td>
        <td>{status}</td>
        <td>{assignedTo}</td>
        <td>{createdAt.slice(0, 10).split("-").reverse().join("-")}</td>
        <td><GrView onClick={()=>navigate(`/dashboard/service/${_id}`)}/></td>     
    </tr>
  )
}

export default ServiceCard