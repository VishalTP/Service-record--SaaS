import React, { useState } from 'react'
import { Button, Modal, Table } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { deleteDevice } from '../../action/serviceAction'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';

const DeviceTable = ({ devices }) => {

    const [show, setShow] = useState(false);
    const [id, setId] = useState("")

    const handleClose = () => setShow(false);
    const handleShow = (id) =>{
        setId(id)
        setShow(true)
    }

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const removeDevice = () => {
        dispatch(deleteDevice(id))
        handleClose()
    }

    return (
        <div>
            <Table>
                <thead>
                    <tr>
                        <th>Device</th>
                        <th>Amount</th>
                        <th>Warranty</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        devices &&
                        devices.map(device =>
                            <tr key={device._id}>
                                <td>{device.name}</td>
                                <td>{device.amount}</td>
                                <td>
                                    {(new Date() - new Date(device.createdAt)) / 1000 / 60 / 60 / 24 < 366 ? <span style={{ color: "green" }}>In Warranty</span> : <span style={{ color: "red" }}>Out of Warranty</span>}
                                </td>
                                <td className="deviceButtons">
                                    <button onClick={()=>navigate(`/dashboard/service/updateDevice/${device._id}`)}><AiFillEdit /></button>
                                    <button onClick={()=>handleShow(device._id)}><AiFillDelete /></button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
            <>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure??</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={removeDevice}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        </div>
    )
}

export default DeviceTable