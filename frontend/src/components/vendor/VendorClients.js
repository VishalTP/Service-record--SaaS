import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { getAllService } from '../../action/serviceAction'
import AllService from '../service/AllService'

const VendorClients = () => {

    const params = useParams()
    const dispatch = useDispatch()
    const {services} = useSelector(state=>state.service)

    useEffect(()=>{
        dispatch(getAllService(params.name))
        console.log(params.name)
    }, [])

  return (
    <div>
        <AllService services={services}/>
    </div>
  )
}

export default VendorClients