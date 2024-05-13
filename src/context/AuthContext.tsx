import React, { createContext, useEffect, useState } from "react";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { supabaseSession } from "@/types";
interface AuthContextProps {
  session: Promise<supabaseSession | null>;
  supabase: SupabaseClient<any, "public", any>;
  linkedinProviderToken?: { access_token: string; refresh_token: string } | undefined;
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

const supabase = createClient(
  "https://vzmyswxvnmseubtqgjpc.supabase.co/",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ6bXlzd3h2bm1zZXVidHFnanBjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkxMjIxNzAsImV4cCI6MjAxNDY5ODE3MH0.AAiG426jPrQRB_BE9_VuIZ9M272zQfFQ76Io169OPHM"
);

export const AuthProvider = ({ children }: any) => {

  const [linkedinProviderToken, setLinkedinProviderToken] = useState<{ access_token: string; refresh_token: string }>()

  useEffect(() => {
    const access_token = localStorage.getItem("linkedinProviderToken")
    const refresh_token = localStorage.getItem("linkedinProviderRefreshToken")
    if (access_token && refresh_token) {
      setLinkedinProviderToken({ access_token, refresh_token })
    }

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event == "INITIAL_SESSION" && session?.user.user_metadata["iss"] == "https://www.linkedin.com/oauth" && session?.provider_token && session?.provider_refresh_token) {
          setLinkedinProviderToken({ access_token: session?.provider_token, refresh_token: session?.refresh_token})
          localStorage.setItem("linkedinProviderToken", session?.provider_token)
          localStorage.setItem("linkedinProviderRefreshToken", session?.provider_refresh_token)
        }

        if (event === "SIGNED_OUT") {
          localStorage.removeItem("linkedinProviderToken")
          localStorage.removeItem("linkedinProviderRefreshToken")
          setLinkedinProviderToken(undefined)
        }
      }
    );

    return () => {
      authListener.subscription?.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ supabase, session: supabase.auth.getSession() as any, linkedinProviderToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
