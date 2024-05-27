import { api } from "../api";
import { ServiceResponse } from "@/types";
import { InternshipApplicationFormTypes } from "@/schemas/internship-application.schema";

export default {
  applyToPosting(
    data: InternshipApplicationFormTypes
  ): Promise<ServiceResponse> {
    const dto = {
      internship_posting_id: data.internship_posting_id,
      message: data.message,
      cv_url: data.cv?.cv_url,
    };
    return api.post("/Internship/Apply", dto);
  },
  followCompany(companyId: number, follow: boolean): Promise<ServiceResponse> {
    return api.post(`/Account/Follow/Company/${companyId}?follow=${follow}`);
  },
  followPosting(postingId: number, follow: boolean): Promise<ServiceResponse> {
    return api.post(`/Account/Follow/Posting/${postingId}?follow=${follow}`);
  },
  commentPosting(data: {
    internship_posting_id: number;
    comment: string;
    points: number;
  }): Promise<ServiceResponse> {
    return api.post("/Internship/Comment", data);
  },
  listInternApplications(): Promise<ServiceResponse> {
    return api.get("/Account/ListApplications");
  },
  listRecommendedPosting(): Promise<ServiceResponse> {
    return api.get("/Internship/Suggestions");
  },
};
