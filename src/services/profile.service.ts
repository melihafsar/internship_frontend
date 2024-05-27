import {
  Detail,
  Foreignlanguage,
  LinkedinScrapeResponse,
  Reference,
  ServiceReponse,
  Universityeducation,
  UserProject,
  Work,
} from "@/types";
import { api } from "../api";
import { EducationFormTypes } from "@/schemas/education-form.schema";
import { CompanyFormTypes } from "@/schemas/company-form.schema";
import { WorkFormTypes } from "@/schemas/work-form.schema";

export default {
  getUserInfo() {
    return api.post("/Account/GetInfo");
  },
  registerNotificationToken(token: string) {
    if (!localStorage.getItem('sb-vzmyswxvnmseubtqgjpc-auth-token')) return
    api.post("/Account/RegisterNotificationToken", { token });
  },
  getMessages() : Promise<ServiceResponse<{ title: string, body: string, created_at: string }[]>> {
    return api.get("/Account/Messages");
  },
  updateUserInfo({
    name,
    surname,
    phone_number,
    account_type,
  }: {
    name?: string;
    surname?: string;
    phone_number?: string;
    account_type?: string;
  }) {
    return api.post("/Account/UpdateUserInfo", {
      name,
      surname,
      phone_number,
      account_type,
    });
  },
  async scrapeLinkedin(dto: { access_token: string }) {
    var result = await api.post("/Account/ScrapeLinkedin", dto) as LinkedinScrapeResponse;
    result.educations.forEach((education) => {
      education.start_date = new Date(education.start_date);
      education.end_date = new Date(education.end_date);
      education.university_available = !!education.university_id;
    });

    result.work_history.forEach((work) => {
      work.start_date = new Date(work.start_date);
      work.end_date = new Date(work.end_date);
    });

    return result;
  },
  getProfile() {
    return api.get("/Account/Get");
  },
  updateProfileImage(imageData: FormData) {
    return api.post("/Account/UpdateProfileImage", imageData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  addNewEducation(newEducationDate: Universityeducation) {
    return api.post("/UniversityEducation/Create", newEducationDate);
  },
  deleteEducation(educationId: number) {
    return api.post(`/UniversityEducation/Delete/${educationId}`);
  },
  updateEducation(educationId: number, educationData: Universityeducation) {
    return api.post(
      `/UniversityEducation/Update/${educationId}`,
      educationData
    );
  },
  addNewForeignLanguage(newLanguageData: Foreignlanguage) {
    return api.post("/ForeignLanguage/Create", newLanguageData);
  },
  deleteForeignLanguage(languageId: number) {
    return api.post(`/ForeignLanguage/Delete/${languageId}`);
  },
  updateForeignLanguage(languageId: number, languageData: Foreignlanguage) {
    return api.post(`/ForeignLanguage/Update/${languageId}`, languageData);
  },
  addNewExperience(newExperienceData: Work) {
    return api.post("/WorkHistory/Create", newExperienceData);
  },
  deleteExperience(experienceId: number) {
    return api.post(`/WorkHistory/Delete/${experienceId}`);
  },
  updateExperience(experienceId: number, experienceData: Work) {
    return api.post(`/WorkHistory/Update/${experienceId}`, experienceData);
  },
  createProject(newProjectData: UserProject) {
    return api.post("/UserProject/Create", newProjectData);
  },
  deleteProject(projectId: number) {
    return api.post(`/UserProject/Delete/${projectId}`);
  },
  updateProject(projectId: number, projectData: UserProject) {
    return api.post(`/UserProject/Update/${projectId}`, projectData);
  },
  updateProjectField(projectId: number, field: FormData) {
    return api.put(`/UserProject/UpdateThumbnail/${projectId}`, field, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  updateUserDetails(userDetails: Detail) {
    return api.post("/UserDetail/Update", userDetails);
  },
  addNewReference(newReferenceData: Reference) {
    return api.post("/UserDetail/Reference/Create", newReferenceData);
  },
  deleteReference(referenceId: number) {
    return api.post(`/UserDetail/Reference/Delete/${referenceId}`);
  },
  updateReference(referenceId: number, referenceData: Reference) {
    return api.post(
      `/UserDetail/Reference/Update/${referenceId}`,
      referenceData
    );
  },
};
