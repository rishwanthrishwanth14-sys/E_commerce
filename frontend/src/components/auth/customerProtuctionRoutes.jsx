import { Navigate,Outlet } from "react-router-dom";

export default function CustomerRoutes(){

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role")
    if(!token){
        return <Navigate to="/customer/login" replace/>
    }
    if(role !== "customer"){
        return <Navigate to="/" replace />
    }
    return <Outlet />
}