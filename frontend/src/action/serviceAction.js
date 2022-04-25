import axios from 'axios'
import serviceActionType from '../actionTypes/serviceActionType'

export const getAllService = (vendor="", status="", name="", code="")=> async (dispatch)=>{
    try {
        dispatch({type: serviceActionType.ALL_SERVICE_REQUEST})
        
        const {data} = await axios(
            `/api/v1/admin/service${vendor? `?vendor=${vendor}`:""}${status? `?status=${status}`:""}${name? `?name=${name}`:""}${code? `?serviceCode=${code}`:""}`) 
        
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
        console.log(error)
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
