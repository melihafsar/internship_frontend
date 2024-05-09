import { CompanyFormTypes } from "@/schemas/company-form.schema";
import { api } from "../api";
export default {
    updateCompany(data: CompanyFormTypes) {
        return api.post("/Company/Update", data);
    },
};
