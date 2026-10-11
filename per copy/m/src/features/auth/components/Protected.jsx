import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'

const Protected = ({children}) => {
    const user = useSelector(state =>state.auth.user)
    const loading = useSelector(state =>state.auth.loading)

    if(loading){
        return <div>Loading...  </div>
    }
    if(!user){
        return <div><Navigate to="/login" replace/></div>
    }
    
    return children
}

export default Protected