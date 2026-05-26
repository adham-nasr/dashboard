import { Navigate, Outlet, Route } from "react-router";
import { useAuth } from "../hooks/useAuth";




function GuestRoutes(){


    const {user} = useAuth()
    
    return (
        !user ? <Outlet /> : <Navigate to="/"/>
    )
}

export default GuestRoutes;