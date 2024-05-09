import { api } from "../api";
export default {
  getCountries() : Promise<{ id: number; name: string; code: string; code3: string }[]> {
    return api.get("/Location/ListCountries");
  },
  getCities(countryId: number) : Promise<{ id: number; name: string; country_id: number }[]> {
    return api.get(`/Location/ListCities?countryId=${countryId}`);
  },
};
