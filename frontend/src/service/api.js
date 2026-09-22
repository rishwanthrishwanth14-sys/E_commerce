import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${token}`;
        }

        if (config.data instanceof FormData) {
            delete config.headers["Content-Type"];
        }

        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status;
        const requestHadToken = Boolean(
            error.config?.headers?.Authorization
        );

        if (status === 401 && requestHadToken) {
            const role = localStorage.getItem("role");

            localStorage.removeItem("token");
            localStorage.removeItem("role");

            const loginPath =
                role === "customer"
                    ? "/customer/login"
                    : role === "admin"
                        ? "/admin/login"
                        : "/";

            window.location.href = loginPath;
        }

        return Promise.reject(error);
    }
);

export default api;
