export interface supabaseSession {
  access_token: string;
  expires_at: number;
  refresh_token: string;
  token_type: string;
  user: {
    app_metadata: {
      provider: string;
      roles: string;
    };
    aud: string;
    created_at: string;
    email: string;
    id: string;
    role: string;
    updated_at: string;
    user_metadata: {
      full_name: string;
    };
  };
}
export interface UserDetail {
  id: number;
  email: string;
  name: string;
  surname: string;
  profile_photo_url: string;
  phone_number: string;
  foreign_languages: Foreignlanguage[];
  university_educations: Universityeducation[];
  works: Work[];
  projects: UserProject[];
  detail: Detail;
  references: Reference[];
}
interface Detail {
  date_of_birth?: string;
  gender: string;
  driver_licenses: string[];
  marital_status?: string;
  military_status?: string;
  country_id?: number;
  city_id?: number;
  district?: string;
  address?: string;
}
interface UserProject {
  project_name: string;
  description: string;
  project_thumbnail?: string;
  project_link?: string;
  id?: number;
}
interface Work {
  position: string;
  company_name: string;
  start_date: string;
  end_date?: string;
  is_working_now: boolean;
  description?: string;
  duties: string;
  work_type?: string;
  reason_for_leave?: string;
  id?: number;
}
interface Universityeducation {
  university_id?: number;
  university_name?: string;
  faculty: string;
  department: string;
  start_date: string;
  end_date: string | null;
  is_graduated: boolean;
  education_year?: number | null;
  gpa: number;
  description?: string;
  id?: number;
}
interface Foreignlanguage {
  language_code: string;
  degree: string;
  id?: number;
}

interface Reference {
  name: string;
  surname: string;
  company: string;
  duty: string;
  email: string;
  phone_number: string;
  description: string;
  id?: number;
}

interface ServiceError {
  name: string;
  details: string;
  errors: { [key: string]: string };
}

interface ServiceReponse<T> {
  data: T;
  error: ServiceError;
}

interface PagedListDto<T> {
  items: T[];
  from: number;
  count: number;
  total: number;
}