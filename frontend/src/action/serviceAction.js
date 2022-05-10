import axios from 'axios'
import serviceActionType from '../actionTypes/serviceActionType'

export const getAllService = (vendor="", status="", name="", code="", amt=false, page)=> async (dispatch)=>{
    try {
        dispatch({type: serviceActionType.ALL_SERVICE_REQUEST})
        
        const {data} = await axios(`/api/v1/admin/service?page=${page}${vendor? `&vendor=${vendor}`:""}${status? `&status=${status}`:""}${name? `&name=${name}`:""}${code? `&serviceCode=${code}`:""}${amt? `&pendingAmount[gte]=1`:""}`) 
        
        dispatch({type: serviceActionType.ALL_SERVICE_SUCCESS, payload: data})
        
    } catch (error) {
        dispatch({type: serviceActionType.ALL_SERVICE_FAIL, payload: error.response.data.message})
    }
}

export const createNewService = (formData)=> async (dispatch)=>{
    try {
        dispatch({type: serviceActionType.NEW_SERVICE_REQUEST})
        
        const {data} = await axios.post('/api/v1/admin/service/new', 
            formData, 
            {headers: {"Content-Type": "application/json"}} 
        ) 
        
        dispatch({type: serviceActionType.NEW_SERVICE_SUCCESS, payload: data.success})
        
    } catch (error) {
        dispatch({type: serviceActionType.NEW_SERVICE_FAIL, payload: error.response.data.message})
    }
}

export const getServiceDetails = (id)=> async (dispatch)=>{
    try {
        dispatch({type: serviceActionType.SERVICE_DETAILS_REQUEST})
        
        const {data} = await axios(
            `/api/v1/admin/service/${id}`) 
        
        dispatch({type: serviceActionType.SERVICE_DETAILS_SUCCESS, payload: data})
        
    } catch (error) {
        dispatch({type: serviceActionType.SERVICE_DETAILS_FAIL, payload: error.response.data.message})
    }
}

export const updateService = (id, formData)=> async (dispatch)=>{
    try {
        
        const {data} = await axios.put( 
            `/api/v1/admin/service/${id}`,
            formData, 
            {headers: {"Content-Type": "application/json"}} 
        ) 
        
        dispatch({type: serviceActionType.UPDATE_SERVICE_SUCCESS, payload: data})
        
    } catch (error) {
        dispatch({type: serviceActionType.UPDATE_SERVICE_FAIL, payload: error.response.data.message})
    }
}

export const createNewDevice = (formData)=> async (dispatch)=>{
    try {
        dispatch({type: serviceActionType.NEW_DEVICE_REQUEST})
        
        const {data} = await axios.post('/api/v1/admin/device/new', 
            formData, 
            {headers: {"Content-Type": "application/json"}} 
        ) 
        
        dispatch({type: serviceActionType.NEW_DEVICE_SUCCESS, payload: data})
        
    } catch (error) {
        dispatch({type: serviceActionType.NEW_DEVICE_FAIL, payload: error.response.data.message})
    }
}

export const deleteDevice = (id)=> async (dispatch)=>{
    try {
        
        const {data} = await axios.delete( `/api/v1/admin/device/${id}` ) 
        
        dispatch({type: serviceActionType.DELETE_DEVICE_SUCCESS, payload: data.success})
        
    } catch (error) {
        dispatch({type: serviceActionType.DELETE_DEVICE_FAIL, payload: error.response.data.message})
    }
}

export const getDeviceDetails = (id)=> async (dispatch)=>{
    try {
        dispatch({type: serviceActionType.DEVICE_DETAILS_REQUEST})
        
        const {data} = await axios(`/api/v1/admin/device/${id}`) 
        
        dispatch({type: serviceActionType.DEVICE_DETAILS_SUCCESS, payload: data})
        
    } catch (error) {
        dispatch({type: serviceActionType.DEVICE_DETAILS_FAIL, payload: error.response.data.message})
    }
}

export const updateDevice = (formData, id)=> async (dispatch)=>{
    try {
        dispatch({type: serviceActionType.UPDATE_DEVICE_REQUEST})
        
        const {data} = await axios.put(`/api/v1/admin/device/${id}`, 
            formData, 
            {headers: {"Content-Type": "application/json"}} 
        ) 
        
        dispatch({type: serviceActionType.UPDATE_DEVICE_SUCCESS, payload: data})
        
    } catch (error) {
        dispatch({type: serviceActionType.UPDATE_SERVICE_FAIL, payload: error.response.data.message})
    }
}