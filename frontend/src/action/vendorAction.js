import axios from "axios"
import vendorActionType from "../actionTypes/vendorActionType"

export const getAllVendors = ()=> async (dispatch)=>{
    try {
        dispatch({type: vendorActionType.ALL_VENDORS_REQUEST})
        
        const {data} = await axios('/api/v1/allvendors') 
        
        dispatch({type: vendorActionType.ALL_VENDORS_SUCCESS, payload: data})
        
    } catch (error) {
        dispatch({type: vendorActionType.ALL_VENDORS_FAIL, payload: error.response.data.message})
    }
}

export const addVendor = (formData)=> async (dispatch)=>{
    try {
        dispatch({type: vendorActionType.ADD_VENDOR_REQUEST})
        
        const {data} = await axios.post('/api/v1/addvendor', formData, {headers:{"Content-Type": "applicaton/json"}}) 
        
        dispatch({type: vendorActionType.ADD_VENDOR_SUCCESS, payload: data})
        
    } catch (error) {
        dispatch({type: vendorActionType.ADD_VENDOR_FAIL, payload: error.response.data.message})
    }
}

export const getVendor = (id)=> async (dispatch)=>{
    try {
        dispatch({type: vendorActionType.VENDOR_DETAILS_REQUEST})
        
        const {data} = await axios(`/api/v1/vendordetails/${id}`) 
        
        dispatch({type: vendorActionType.VENDOR_DETAILS_SUCCESS, payload: data})
        
    } catch (error) {
        dispatch({type: vendorActionType.VENDOR_DETAILS_FAIL, payload: error.response.data.message})
    }
}

export const updateVendor = (formData, id)=> async (dispatch)=>{
    try {
        dispatch({type: vendorActionType.UPDATE_VENDOR_REQUEST})
        
        const {data} = await axios.put(`/api/v1/updateVendor/${id}`, formData, {headers:{"Content-Type": "applicaton/json"}}) 
        
        dispatch({type: vendorActionType.UPDATE_VENDOR_SUCCESS, payload: data})
        
    } catch (error) {
        dispatch({type: vendorActionType.UPDATE_VENDOR_FAIL, payload: error.response.data.message})
    }
}