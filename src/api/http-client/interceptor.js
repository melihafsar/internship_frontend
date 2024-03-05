export default class Interceptor {
    constructor(axiosObject) {
        this.requestInterceptor = null;
        this.responseInterceptor = null;
        this.axiosObject = axiosObject;
    }
    setRequestInterceptor() {
        this.requestInterceptor = this.axiosObject.interceptors.request.use(
            (config) => {
                const authToken = JSON.parse(localStorage.getItem('sb-vzmyswxvnmseubtqgjpc-auth-token'));
                if (authToken) config.headers.Authorization = `Bearer ${authToken.access_token}`;
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
    }

    setResponseInterceptor() {
        this.responseInterceptor = this.axiosObject.interceptors.response.use(
            (response) => {
                return response;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
    }
}