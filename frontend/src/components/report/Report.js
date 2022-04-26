import React, { useEffect } from 'react'
import { Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { getReport } from '../../action/reportAction'


const Report = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { paidAmount, pendingAmount, totalServices, loading } = useSelector(state => state.report)
    useEffect(() => {
        dispatch(getReport())
    }, [])
    return (
        <>
            <Card.Body className="cardBody">
                <Link to="/home">Dashboard</Link> / Report
            </Card.Body>
            <div className="row">

                <Card
                    bg="primary"
                    text='white'
                    style={{ width: '18rem' }}
                    className="col-md-4 !important"
                    key={"primary"}
                >
                    <Card.Header>Total Services Registered</Card.Header>
                    <Card.Body>
                        <Card.Title> {totalServices} </Card.Title>
                    </Card.Body>
                </Card>

                <Card
                    bg="success"
                    text='white'
                    style={{ width: '18rem' }}
                    className="col-md-4 !important"
                    key={"success"}
                >
                    <Card.Header>Total Revenue Generated</Card.Header>
                    <Card.Body>
                        <Card.Title>Rs {paidAmount} </Card.Title>
                    </Card.Body>
                </Card>

                <Card
                    bg="danger"
                    text='white'
                    style={{ width: '18rem' }}
                    className="col-md-4 !important"
                    key={"danger"}
                    onClick={() => navigate("pending")}
                >
                    <Card.Header>Total Pending Amount</Card.Header>
                    <Card.Body>
                        <Card.Title>Rs {pendingAmount} </Card.Title>
                    </Card.Body>
                </Card>

            </div>

        </>
    )
}

export default Report