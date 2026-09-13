import { Navigate , Outlet } from "react-router-dom"; 

export default function PublicRoutes() {
    const token = localStorage.getItem("token"); 
    const role = localStorage.getItem("role");
    
    if(token && role === "user"){
        return <Navigate to="/admin/dashboard" replace />
    }

    if(token && role === "customer"){
        return<Navigate to ="/customer/dashboard" replace />;
    }

    //not login 
    return<Outlet />
}