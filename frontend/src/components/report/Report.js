import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getReport } from '../../action/reportAction'


const Report = () => {

    const dispatch = useDispatch()
    const {paidAmount, pendingAmount, totalServices, loading} = useSelector(state=>state.report)
    console.log(paidAmount)
    useEffect(()=>{
        dispatch(getReport())
    }, [])
  return (
      <>
      {
      <div>
       {paidAmount && <div className="round">{paidAmount}</div>}
        <div className="round">{pendingAmount}</div>
        <div className="round">{totalServices}</div>
    </div>
}
    </>
  )
}

export default Report