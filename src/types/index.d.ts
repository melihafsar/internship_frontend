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

interface ServiceResponse<T = any> {
  data: T;
  error: ServiceError;
}

interface PagedListDto<T> {
  items: T[];
  from: number;
  count: number;
  total: number;
}

export interface DetailedCompanyDto {
  id: number;
  name: string;
  short_description?: string;
  logo_url?: string;
  website_url?: string;
  background_photo_url?: string;
  city_id?: number;
  country_id?: number;
  sector?: string;
  number_of_workers?: number;
  description?: string;
}

interface Comment {
  comment: string;
  created_at: string;
  photo_url: string;
  points: number;
  user_id: number;
  user_name: string;
  user_surname: string;
}

interface InternNotificationMessage {
  title: string;
  body: string;
  created_at: string;
}

interface ApplicationUserDetail {
  id: number;
  user_id: number;
  internship_posting_id: number;
  name: string;
  surname: string;
  profile_photo_url: string;
  message: string;
  cv_url: string;
  created_at: string;
}

export interface DetailedPostingApplication {
  id: number;
  internship_posting_id: number;
  message: string;
  cv_url: string;
  user_id: number;
  email: string;
  name: string;
  surname: string;
  profile_photo_url: string;
  phone_number: string;
  foreign_languages: Array<{
    language_code: string;
    degree: string;
    id: number;
  }>;
  university_educations: Array<{
    university_id: number;
    university_name: string;
    faculty: string;
    department: string;
    start_date: string;
    end_date: string;
    education_year: number;
    is_graduated: boolean;
    gpa: number;
    description: string;
    id: number;
  }>;
  works: Array<{
    position: string;
    company_name: string;
    start_date: string;
    end_date: string;
    is_working_now: boolean;
    description: string;
    duties: string;
    work_type: string;
    reason_for_leave: string;
    id: number;
  }>;
  projects: Array<{
    project_name: string;
    description: string;
    project_link: string;
    id: number;
  }>;
  references: Array<{
    id: number;
    name: string;
    surname: string;
    company: string;
    duty: string;
    email: string;
    phone_number: string;
    description: string;
  }>;
  detail: {
    date_of_birth: string;
    gender: string;
    driver_licenses: Array<string>;
    marital_status: string;
    military_status: string;
    country_id: number;
    city_id: number;
    district: string;
    address: string;
  };
}

//TODO

interface Company {
  company_id: number;
  name: string;
  short_description: string;
  logo_url: string;
  number_of_comments: number;
  average_points: number;
  is_current_user_following: boolean;
}

interface Posting {
  id: number;
  is_current_user_following: boolean;
  is_current_user_applied: boolean;
  company: Company;
  title: string;
  image_url: string;
  background_photo_url: string;
  description: string;
  sector: string;
  country_id: number;
  city_id: number;
  location: string;
  requirements: string;
  work_type: string;
  employment_type: string;
  has_salary: boolean;
  dead_line: string;
}

interface MyApplicationType {
  id: number;
  internship_posting_id: number;
  message: string;
  cv_url: string;
  posting: Posting;
}
