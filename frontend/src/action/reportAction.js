import axios from "axios"
import reportActionType from "../actionTypes/reportActionType"

export const getReport = ()=> async (dispatch)=>{
    try {
        
        dispatch({type: reportActionType.GET_REPORT_REQUEST})

        const { data } = await axios("/api/v1/admin/serviceReport")
        console.log(data)

        dispatch({type: reportActionType.GET_REPORT_SUCCESS, payload: data})

    } catch (error) {

        dispatch({type: reportActionType.GET_REPORT_FAIL, payload: error.response.data.message})

    }
}