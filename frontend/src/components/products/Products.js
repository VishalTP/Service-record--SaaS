import React, { useEffect, useRef, useState } from 'react'
import { Button, Form, Table, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom'
import { addNewProduct, getAllProducts, updateAProduct } from '../../action/productAction'
import './Product.css'

const Products = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const path = useLocation()

    const { products, loading, success, message } = useSelector(state => state.product)

    const [productName, setProductName] = useState("")
    const addBtn = useRef()
    const updtBtn = useRef()
    const myForm = new FormData()
    
    const addProduct = () => {
        myForm.set("name", productName)
        dispatch(addNewProduct(myForm))
        setProductName("")
    }

    const editProduct = (id, name)=>{
        navigate(`/dashboard/product/list/${id}`)
        addBtn.current.classList.add("hideBtn")
        updtBtn.current.classList.remove("hideBtn")
        setProductName(name)
    }
    const updateProduct = ()=>{
        addBtn.current.classList.remove("hideBtn")
        updtBtn.current.classList.add("hideBtn")
        myForm.set("name", productName)
        dispatch(updateAProduct(myForm, path.pathname.split("/")[4]))
        navigate("/dashboard/product/list")
    }
    
    useEffect(() => {
        dispatch(getAllProducts())
        
    }, [dispatch, success])


    return (
        <div>
            <Card>
                <Card.Body className="cardBody"><Link to="/home">Dashboard</Link> / Products</Card.Body>
            </Card>
            <div className="newProduct">
                <Form.Group className="col-md-4" >
                    <Form.Control
                        required
                        type="text"
                        value={productName}
                        onChange={e => setProductName(e.target.value)}
                        placeholder="Name"
                    />
                </Form.Group>
                <Button ref={addBtn}  onClick={addProduct}>Add </Button>
                <Button ref={updtBtn} onClick={updateProduct} className="hideBtn" >Update</Button>
            </div>

            <Table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products && products.map(product =>
                            <tr className="" key={product._id}>
                                <td>{product.name}</td>
                                <td><Button onClick={()=>editProduct(product._id, product.name)}>Edit</Button></td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default Products