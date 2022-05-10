import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllVendors } from '../../action/vendorAction';
import VendorCard from './VendorCard';
import { Table, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';

const Vendors = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { vendors } = useSelector(state => state.vendor)
  useEffect(() => {
    dispatch(getAllVendors())


  }, [])


  return (
    <>
      <Card>
        <Card.Body className="cardBody">
          <Link to="/home">Dashboard</Link> / Vendor
        </Card.Body>
      </Card>
      <div>
        <Button onClick={() => navigate("/dashboard/vendor/add")}>Add Vendor</Button>
        <Table striped >
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact Person</th>
              <th>Contact Number</th>
              <th>Location</th>
              <th>Vendor Clients</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {vendors && vendors.map(vendor => <VendorCard key={vendor._id} {...vendor} />)}
          </tbody>
        </Table>
      </div>
      <Sidebar />
    </>
  )
}

export default Vendors