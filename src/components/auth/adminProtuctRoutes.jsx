import { Navigate,Outlet } from "react-router-dom";

export default function AdminRoutes(){
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if(!token){
        return <Navigate to="/admin/login" replace />
    }

    if(role !== "user"){ // login person oda role user(admin) ahh illana 
        return <Navigate to="/" replace />
    }
    return<Outlet/>
}