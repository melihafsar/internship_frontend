import { CompanyFormTypes } from "@/schemas/company-form.schema";
import { api } from "../api";
import { PagedListDto, ServiceResponse } from "@/types";
import { InternshipPostingFormTypes } from "@/schemas/internship-posting.schema";

export default {
  getCompany(): Promise<ServiceResponse<CompanyFormTypes>> {
    return api.get("/Company/Get");
  },
  updateCompany(data: CompanyFormTypes) {
    const dto = { ...data };
    delete dto.id;
    return api.post("/Company/Update", dto);
  },
  listPostings(
    from: number,
    companyId?: number,
    take?: number,
    sort?: string
  ): Promise<ServiceResponse<PagedListDto<InternshipPostingFormTypes>>> {
    return api
      .get(`/Company/InternshipPosting/List`, {
        params: {
          from,
          companyId,
          take,
          sort,
        },
      })
      .then(
        (
          response: ServiceResponse<PagedListDto<InternshipPostingFormTypes>>
        ) => {
          response.data.items.forEach((item) => {
            item.dead_line = new Date(item.dead_line);
          });
          return response;
        }
      );
  },
  createPosting(data: InternshipPostingFormTypes) {
    return api.post("/Company/InternshipPosting/Create", data);
  },
  updatePosting(data: InternshipPostingFormTypes) {
    const id = data.id;
    const dto = { ...data };
    delete dto.id;

    return api.post(`/Company/InternshipPosting/Update/${id}`, dto);
  },
  endPosting(data: InternshipPostingFormTypes) {
    const id = data.id;
    return api.post(`/Company/InternshipPosting/End/${id}`);
  },
};
