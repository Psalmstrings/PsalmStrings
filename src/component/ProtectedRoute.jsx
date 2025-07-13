import { useContext, useEffect, useState } from "react"
import { Navigate, Outlet, useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { authContext } from "../contexts/Authcontext"

const ProtedtedRoutes = () => {
    // get access token form loacl storage
    const {isAuthenticated} = useContext(authContext)
    const isAuth = isAuthenticated() // true || false
    const navigate = useNavigate()

    useEffect(()=>{
        if(!isAuth){
            toast.warning("You have to be logged in")
            navigate("/signin")
        }
    },[isAuth, navigate])

    return isAuth ? <Outlet /> : null
}

export default ProtedtedRoutes
