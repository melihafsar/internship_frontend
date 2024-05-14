import { api } from "../api";
import { ServiceResponse } from "@/types";
import { InternshipApplicationFormTypes } from "@/schemas/internship-application.schema";

export default {
    applyToPosting(data: InternshipApplicationFormTypes) : Promise<ServiceResponse> {
        const dto = {
            internship_posting_id: data.internship_posting_id,
            message: data.message,
            cv_url: data.cv?.cv_url,
        }
        return api.post("/Internship/Apply", dto);
    },
};
