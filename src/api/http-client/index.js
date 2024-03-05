import axios from 'axios';
import Interceptor from './interceptor.js';

class HttpService {
    constructor(options) {
        this.instance = axios.create(options);
        this.interceptor = new Interceptor(this.instance);

        this.interceptor.setRequestInterceptor();
        // this.interceptor.setResponseInterceptor();
    }

    get(...args) {
        return this.instance.get(...args).then(({ data }) => data).catch((error) => Promise.reject(error))
    }
    post(...args) {
        return this.instance.post(...args).then(({ data }) => data).catch((error) => Promise.reject(error))
    }
    put(...args) {
        return this.instance.put(...args).then(({ data }) => data).catch((error) => Promise.reject(error))
    }
    delete(...args) {
        return this.instance.delete(...args).then(({ data }) => data).catch((error) => Promise.reject(error))
    }
}

export default HttpService;