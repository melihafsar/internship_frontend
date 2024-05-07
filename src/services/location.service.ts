import { api } from "../api";
export default {
  getCountries() {
    return api.get("/Location/ListCountries");
  },
  getCities(countryId: number) {
    return api.get(`/Location/ListCities?countryId=${countryId}`);
  },
};
