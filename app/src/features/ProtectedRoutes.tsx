import { Navigate, Outlet } from "react-router";
import { useAuth } from "../hooks/useAuth";


function ProtectedRoutes(){


    const {user} = useAuth()
    
    return (
        user ? <Outlet /> : <Navigate to="/auth/login"/>
    )
}

export default ProtectedRoutes;