import { api } from '../api';
export default {
    getCountries() {
        return api.get('/Location/ListCountries');
    },
    getCities(countryId) {
        return api.get(`/Location/ListCities?countryId=${countryId}`);
    },
}