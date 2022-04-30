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
                services: action.payload.services
            }
        case serviceActionType.NEW_SERVICE_SUCCESS:
            return {
                loading : false,
                success : action.payload
            }
        case serviceActionType.SERVICE_DETAILS_SUCCESS:
            return {
                loading: false,
                service: action.payload.service
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