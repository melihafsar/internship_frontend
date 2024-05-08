import React, { createContext, useEffect, useMemo, useState } from "react";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { supabaseSession } from "@/types";
interface AuthContextProps {
  session: Promise<supabaseSession | null>;
  supabase: SupabaseClient<any, "public", any>;
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

const supabase = createClient(
  "https://vzmyswxvnmseubtqgjpc.supabase.co/",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ6bXlzd3h2bm1zZXVidHFnanBjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkxMjIxNzAsImV4cCI6MjAxNDY5ODE3MH0.AAiG426jPrQRB_BE9_VuIZ9M272zQfFQ76Io169OPHM"
);

export const AuthProvider = ({ children }: any) => {
  return (
    <AuthContext.Provider
      value={{ supabase, session: supabase.auth.getSession() as any }}
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
