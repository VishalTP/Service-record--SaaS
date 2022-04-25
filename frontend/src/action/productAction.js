import axios from 'axios'
import productActionType from '../actionTypes/productActionType'

export const getAllProducts = ()=> async (dispatch)=>{
    try {
        dispatch({type: productActionType.ALL_PRODUCTS_REQUEST})
        
        const {data} = await axios('/api/v1/products') 
        
        dispatch({type: productActionType.ALL_PRODUCTS_SUCCESS, payload: data})
        // console.log(data)
        
    } catch (error) {
        dispatch({type: productActionType.ALL_PRODUCTS_FAIL, payload: error.response.data.message})
    }
}

export const addNewProduct = (formData)=> async (dispatch)=>{
    try {
        dispatch({type: productActionType.NEW_PRODUCT_REQUEST})
        
        const {data} = await axios.post('/api/v1/product/new', formData, {headers: {"Content-Type" : "application/json"}}) 
        
        dispatch({type: productActionType.NEW_PRODUCT_SUCCESS, payload: data})
        
    } catch (error) {
        dispatch({type: productActionType.NEW_PRODUCT_FAIL, payload: error.response.data.message})
    }
}

export const updateAProduct = (formData, id)=> async (dispatch)=>{
    try {
        dispatch({type: productActionType.UPDATE_PRODUCT_REQUEST})
        
        const {data} = await axios.put(`/api/v1/product/${id}`, formData, {headers: {"Content-Type" : "application/json"}}) 
        
        dispatch({type: productActionType.UPDATE_PRODUCT_SUCCESS, payload: data})
        
    } catch (error) {
        dispatch({type: productActionType.UPDATE_PRODUCT_FAIL, payload: error.response.data.message})
    }
}