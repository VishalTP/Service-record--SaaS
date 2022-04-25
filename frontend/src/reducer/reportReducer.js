import reportActionType from "../actionTypes/reportActionType"

export const reportReducer = (state= {error: null}, action)=>{
    switch(action){
        case reportActionType.GET_REPORT_REQUEST:
            return {
                loading : true
            }
        case reportActionType.GET_REPORT_SUCCESS:
            return {
                ...state,
                loading : false,
                paidAmount : action.payload.paidAmount,
                pendingAmount : action.payload.pendingAmount,
                totalServices : action.payload.totalServices
            }
        case reportActionType.GET_REPORT_FAIL:
            return {
                loading : false,
                error : action.payload
            }
        default :
            return state
    }
}

