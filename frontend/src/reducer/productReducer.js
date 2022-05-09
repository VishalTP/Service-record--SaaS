import productActionType from '../actionTypes/productActionType'

export const productReducer = (state ={loading: false, error: null}, action)=>{
    switch(action.type){
        case productActionType.ALL_PRODUCTS_REQUEST:
        case productActionType.NEW_PRODUCT_REQUEST:
        case productActionType.UPDATE_PRODUCT_REQUEST:
            return {
                loading : true,
            }
        case productActionType.ALL_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading : false,
                products: action.payload.products
            }
        case productActionType.NEW_PRODUCT_SUCCESS:
            return {
                loading : false,
                success : action.payload
            }
        case productActionType.UPDATE_PRODUCT_SUCCESS:
        case productActionType.DELETE_PRODUCT_SUCCESS:
            return {
                loading : false,
                success : action.payload.success,
                message : action.payload.message
            }
        case productActionType.ALL_PRODUCTS_FAIL:
        case productActionType.NEW_PRODUCT_FAIL:
        case productActionType.UPDATE_PRODUCT_FAIL:
        case productActionType.DELETE_PRODUCT_FAIL:
            return {
                ...state,
                loading : false,
                error : action.payload
            }
        default:
            return state
    }
}