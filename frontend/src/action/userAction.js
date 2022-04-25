import axios from 'axios'
import userActionType from '../actionTypes/userActionType'

export const loginUser = (formData)=> async (dispatch)=>{
    try {
        dispatch({type: userActionType.USER_LOGIN_REQUEST})
        
        const {data} = await axios.post('/api/v1/login', formData, {headers: {"Content-Type": "application/json"}}  ) 
        
        dispatch({type: userActionType.USER_LOGIN_SUCCESS, payload: data})
        
    } catch (error) {
        dispatch({type: userActionType.USER_LOGIN_FAIL, payload: error.response.data.message})
    }
}

export const registerUser = (formData)=> async (dispatch)=>{
    try {
        dispatch({type: userActionType.USER_REGISTRATION_REQUEST})
        
        const {data} = await axios.post('/api/v1/register', formData, {headers: {"Content-Type": "application/json"}}  ) 
        
        dispatch({type: userActionType.USER_REGISTRATION_SUCCESS, payload: data})
        
    } catch (error) {
        dispatch({type: userActionType.USER_REGISTRATION_FAIL, payload: error.response.data.message})
    }
}

export const logoutUser = ()=> async (dispatch)=>{
    try {
        const {data} = await axios('/api/v1/logout') 
        
        dispatch({type: userActionType.USER_LOGOUT_SUCCESS, payload: data})
        
    } catch (error) {
        dispatch({type: userActionType.USER_LOGOUT_FAIL, payload: error.response.data.message})
    }
}

export const updatePassword = (formData)=> async (dispatch)=>{
    try {
        dispatch({type: userActionType.UPDATE_PASSWORD_REQUEST})
        
        const {data} = await axios.put('/api/v1/password/update', formData, {headers: {"Content-Type": "application/json"}}  ) 
        
        dispatch({type: userActionType.UPDATE_PASSWORD_SUCCESS, payload: data})
        
    } catch (error) {
        dispatch({type: userActionType.UPDATE_PASSWORD_FAIL, payload: error.response.data.message})
    }
}


export const getAllUser = ()=> async (dispatch)=>{
    try {
        dispatch({type: userActionType.ALL_USER_REQUEST})

        const {data} = await axios('/api/v1/admin/users') 
        
        dispatch({type: userActionType.ALL_USER_SUCCESS, payload: data})
        
    } catch (error) {
        dispatch({type: userActionType.ALL_USER_FAIL, payload: error.response.data.message})
    }
}

export const getUserDetails = ()=> async (dispatch)=>{
    try {
        dispatch({type: userActionType.USER_DETAIL_REQUEST})

        const {data} = await axios('/api/v1/me') 
        
        dispatch({type: userActionType.USER_DETAIL_SUCCESS, payload: data})
        
    } catch (error) {
        dispatch({type: userActionType.USER_DETAIL_FAIL, payload: error.response.data.message})
    }
}
