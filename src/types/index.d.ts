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

interface RootObject {
  access_token: string;
  token_type: string;
  expires_in: number;
  expires_at: number;
  refresh_token: string;
  user: User;
}
interface User {
  id: string;
  aud: string;
  role: string;
  email: string;
  email_confirmed_at: string;
  phone: string;
  confirmation_sent_at: string;
  confirmed_at: string;
  last_sign_in_at: string;
  app_metadata: Appmetadata;
  user_metadata: Usermetadata;
  identities: Identity[];
  created_at: string;
  updated_at: string;
}
interface Identity {
  identity_id: string;
  id: string;
  user_id: string;
  identity_data: Identitydata;
  provider: string;
  last_sign_in_at: string;
  created_at: string;
  updated_at: string;
  email: string;
}
interface Identitydata {
  email: string;
  email_verified: boolean;
  phone_verified: boolean;
  sub: string;
}
interface Usermetadata {}
interface Appmetadata {
  provider: string;
  providers: string[];
}
