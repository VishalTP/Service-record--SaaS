import React, { useEffect } from 'react'
import { Button, Table } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import {useDispatch, useSelector} from 'react-redux'
import { getAllUser } from '../../action/userAction'

const User = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {staffs} = useSelector(state=>state.staff)

  useEffect(()=>{
    dispatch(getAllUser())
  }, [])

  return (
    <div>
      <Button onClick={() => navigate("/dashboard/create/user")} >Add Staff</Button>
      <Table striped >
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {
            staffs && staffs.map((staff, i) =>

              <tr>
                <td>{i + 1}</td>
                <td>{staff.name}</td>
                <td>{staff.email}</td>
                <td>{staff.role}</td>
                <td><Button>Delete</Button></td>
              </tr>
            )
          }
        </tbody>
      </Table>
    </div>
  )
}

export default User