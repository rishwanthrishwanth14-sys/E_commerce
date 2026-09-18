import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL ,
    headers: {
        "Content-Type": "application/json"
    }
});

// Automatically attach JWT token
api.interceptors.request.use( //request naa backend ku poradhuku munadi 
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers =config.headers || {}; // just for safety checks dha namma already header attach panniyachu 
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(  //respons naa backend ku poitu front end la respons varum 
    (response) => response,
    (error) =>{
         const status = error.response?.status;
         const requestHadToken = Boolean(
            error.config?.headers?.Authorization
         );
        if (status === 401 && requestHadToken){
            const role = localStorage.getItem("role")

            localStorage.removeItem("token");
            localStorage.removeItem("role");

            const loginPath =
                role === "customer"
                    ?"/customer/loin"
                    :role === "admin"
                     ?"/admin/login"
                     :"/";

            window.location.href =loginPath;
        }

        return Promise.reject(error)
    }
);
export default api;