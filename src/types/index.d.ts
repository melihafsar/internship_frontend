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
  education_year: number;
  works: Work[];
  user_projects: Userproject[];
  detail: Detail;
}
interface Detail {
  date_of_birth: string;
  gender: string;
  driver_licences: string[];
  marital_status: string;
  military_status: string;
  country_id: number;
  city_id: number;
  district: string;
  address: string;
}
interface Userproject {
  project_name: string;
  description: string;
  project_thumbnail: string;
  project_link: string;
  id: number;
}
interface Work {
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
}
interface Universityeducation {
  university_id: number;
  university_name: string;
  faculty: string;
  department: string;
  start_date: string;
  end_date: string;
  is_graduated: boolean;
  gpa: number;
  description: string;
  id: number;
}
interface Foreignlanguage {
  language_code: string;
  degree: string;
  id: number;
}
