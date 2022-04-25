import vendorActionType from "../actionTypes/vendorActionType"

export const vendorReducer = (state = {error: null, vendors:[]}, action)=>{
    switch(action.type){
        case vendorActionType.ALL_VENDORS_REQUEST:
        case vendorActionType.ADD_VENDOR_REQUEST:
        case vendorActionType.VENDOR_DETAILS_REQUEST:
        case vendorActionType.UPDATE_VENDOR_REQUEST:
            return {
                // ...state,
                loading: true
            }
        case vendorActionType.ALL_VENDORS_SUCCESS:
            return {
                ...state,
                loading: false,
                vendors: action.payload.vendors
            }
        case vendorActionType.ADD_VENDOR_SUCCESS:
        case vendorActionType.UPDATE_VENDOR_SUCCESS:
            return{
                loading: false,
                success: action.payload.success
            }
        case vendorActionType.VENDOR_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                vendor: action.payload.vendor
            }
        case vendorActionType.ALL_VENDORS_FAIL:
        case vendorActionType.ADD_VENDOR_FAIL:
        case vendorActionType.VENDOR_DETAILS_FAIL:
        case vendorActionType.UPDATE_VENDOR_FAIL:
            return {
                ...state,
                loading:  false,
                error: action.payload.message
            }
        default:
            return state
    }
}

