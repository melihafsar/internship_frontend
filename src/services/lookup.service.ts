import { api } from "../api";
import { ServiceResponse } from "@/types";
class LookupService {
    _cache: { [key: string]: any } = {};

    _cacheLookup<T>(key: string, fetcher: () => Promise<T>) {
        if (this._cache[key]) {
            return Promise.resolve(this._cache[key]);
        }

        return fetcher().then((data) => {
            this._cache[key] = data;
            return data;
        });
    }

    getUniversities() : Promise<ServiceResponse<{ id: number; name: string }[]>>{
        return this._cacheLookup("universities", this._fetchUniversities);    
    }

    getCountries(): Promise<{ id: number; name: string; code: string; code3: string }[]> {
        return this._cacheLookup("countries", this._fetchCountries);
    }
    
    getCities(countryId: number): Promise<{ id: number; name: string; country_id: number }[]> {
        return this._cacheLookup("cities" + countryId, () => this._fetchCities(countryId));
    }

    _fetchCountries(): Promise<{ id: number; name: string; code: string; code3: string }[]> {
        return api.get("/Location/ListCountries");
    }

    _fetchCities(countryId: number): Promise<{ id: number; name: string; country_id: number }[]> {
        return api.get(`/Location/ListCities?countryId=${countryId}`);
    }

    _fetchUniversities(): Promise<ServiceResponse<{ id: number; name: string }[]>> {
        return api.get("/University/List");
    }

    
}


export default new LookupService();


