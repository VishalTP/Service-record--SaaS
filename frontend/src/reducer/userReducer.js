import userActionType from '../actionTypes/userActionType'


export const userReducer = (state ={error:null, isAuthenticated:false, loading: true}, action)=>{
    switch(action.type){
        case userActionType.USER_LOGIN_REQUEST:
        case userActionType.UPDATE_PASSWORD_REQUEST:
        case userActionType.USER_DETAIL_REQUEST:
            return {
                ...state,
                loading : true,
            }
        case userActionType.USER_LOGIN_SUCCESS:
        case userActionType.UPDATE_PASSWORD_SUCCESS:
        case userActionType.USER_DETAIL_SUCCESS:
            return {
                ...state,
                loading : false,
                isAuthenticated: action.payload.success,
                user: action.payload.user
            }
        case userActionType.USER_LOGOUT_SUCCESS:
            return {

                isAuthenticated: false
            }
        case userActionType.USER_LOGIN_FAIL:
        case userActionType.UPDATE_PASSWORD_FAIL:
        case userActionType.USER_LOGOUT_FAIL:
        case userActionType.USER_DETAIL_FAIL:
            return {
                ...state,
                loading : false,
                error : action.payload
            }
        default:
            return state
    }
}

export const staffReducer = (state ={error:null}, action)=>{
    switch(action.type){
        case userActionType.ALL_USER_REQUEST:
        // case userActionType.USER_DETAIL_REQUEST:
            return {
                ...state,
                loading : true,
            }
        case userActionType.ALL_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                staffs : action.payload.users
            }
        // case userActionType.USER_DETAIL_SUCCESS:
        //     return {
        //             ...state,
        //             loading : false,
        //             staff: action.payload.user
        //         }

        case userActionType.ALL_USER_FAIL:
        // case userActionType.USER_DETAIL_FAIL:
            return {
                ...state,
                loading : false,
                error : action.payload
            }

        default:
            return state
    }
}