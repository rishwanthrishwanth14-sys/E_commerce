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
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(  //respons naa backend ku poitu front end la respons varum 
    (response) =>{
        console.log("SUCCESS RESPONSE:", response.status);
        return response;
    },

    (error) =>{
          console.log("INTERCEPTOR ERROR:", error.response?.status);
        if (error.response?.status === 401){

            console.log("401 dedected")
            localStorage.removeItem("token");
            localStorage.removeItem("role");

            window.location.href ="/";
        }

        return Promise.reject(error)
    }
);
export default api;