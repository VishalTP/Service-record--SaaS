import serviceActionType from '../actionTypes/serviceActionType'

export const serviceReducer = (state ={loading: false, error: null}, action)=>{
    switch(action.type){
        case serviceActionType.ALL_SERVICE_REQUEST:
        case serviceActionType.ALL_SERVICE_REQUEST:
        case serviceActionType.SERVICE_DETAILS_REQUEST:
            return {
                loading : true,
            }
        case serviceActionType.ALL_SERVICE_SUCCESS:
            return {
                ...state,
                loading : false,
                services: action.payload.services,
                serviceCount: action.payload.serviceCount
            }
        case serviceActionType.NEW_SERVICE_SUCCESS:
            return {
                loading : false,
                success : action.payload
            }
        case serviceActionType.SERVICE_DETAILS_SUCCESS:
            return {
                loading: false,
                service: action.payload.service,
                devices: action.payload.device
            }
        case serviceActionType.UPDATE_SERVICE_SUCCESS:
            return {
                ...state,
                success : true
            }
        case serviceActionType.ALL_SERVICE_FAIL:
        case serviceActionType.SERVICE_DETAILS_FAIL:
        case serviceActionType.UPDATE_SERVICE_FAIL:
            return {
                ...state,
                loading : false,
                error : action.payload
            }
        default:
            return state
    }
}

export const deviceReducer = (state ={loading: false, error: null}, action)=>{
    switch(action.type){
        case serviceActionType.NEW_DEVICE_REQUEST:
        case serviceActionType.DEVICE_DETAILS_REQUEST:
        case serviceActionType.UPDATE_DEVICE_REQUEST:
            return {
                ...state,
                loading : true,
            }

        case serviceActionType.NEW_DEVICE_SUCCESS:
        case serviceActionType.DELETE_DEVICE_SUCCESS:
        case serviceActionType.UPDATE_DEVICE_SUCCESS:
            return {
                loading : false,
                success : action.payload.success,
                device: action.payload.device
            }

        case serviceActionType.DEVICE_DETAILS_SUCCESS:
            return {
                loading : false,
                device: action.payload.device
            }

        case serviceActionType.NEW_DEVICE_FAIL:
        case serviceActionType.DELETE_DEVICE_FAIL:
        case serviceActionType.DEVICE_DETAILS_FAIL:
        case serviceActionType.UPDATE_DEVICE_FAIL:
            return {
                ...state,
                loading : false,
                error : action.payload
            }
        case serviceActionType.NEW_DEVICE_RESET:
            return {
                ...state,
                success: false,
                device: null
            }
        default:
            return state
    }
}