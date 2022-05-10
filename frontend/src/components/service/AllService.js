import React from 'react'
import ServiceCard from './ServiceCard'
import { Table } from 'react-bootstrap';
import './NewService.css'

const AllService = ({ services }) => {
  return (
    <div className="table">
      <Table  >
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Product</th>
            <th>Service Code</th>
            <th>Status</th>
            <th>Assigned To</th>
            <th>Created Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {services && services.map((service, i) => <ServiceCard key={service._id} {...service} slNo={i + 1} />)}
        </tbody>
      </Table>
    </div>
  )
}

export default AllService