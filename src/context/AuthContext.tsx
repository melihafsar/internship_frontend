import React, { createContext, useEffect, useState } from "react";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { supabaseSession } from "@/types";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import ProfileService from "@/services/profile.service";
import { useToast } from "@/components/ui/use-toast";
import { getUserInfo, getUserType, mobileCheck } from "@/utils/helpers.utils";
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

const firebaseConfig = {
  apiKey: "AIzaSyCrl1jI3l2TKhKsROm-JZvBHTiNEZLK_8w",
  authDomain: "stajbuldum-app.firebaseapp.com",
  projectId: "stajbuldum-app",
  storageBucket: "stajbuldum-app.appspot.com",
  messagingSenderId: "498083395558",
  appId: "1:498083395558:web:b2aa5ac37c33d469c60827",
  measurementId: "G-2Q9E6EP488",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

declare global {
  interface Window {
    registerToken: (token: string) => Promise<any> | undefined;
    FlutterRegisterToken: {
      postMessage: (message: string) => void;
    };
  }
}

if ("serviceWorker" in navigator && !mobileCheck()) {
  const messaging = getMessaging(app);
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js")
    .then((registration) => {
      console.log("Service Worker registered with scope:", registration.scope);
      Notification.requestPermission().then(async (permission) => {
        if (permission === "granted") {
          var token = await getToken(messaging, {
            vapidKey:
              "BFSouVziti1xXXV80FJqJZ5LCgAgUb8I9hfrMkHVIyvWm1hbKXDut-kdrrfGVT_ABds7vSmoxAR151cKZVGXfkY",
          });
          console.log("token", token);
          ProfileService.registerNotificationToken(token);
        }
      });
    })
    .catch((error) => {
      console.error("Service Worker registration failed:", error);
    });
}

if (mobileCheck()) {
  window.registerToken = async (token) => {
    ProfileService.registerNotificationToken(token);
  };
}

export const AuthProvider = ({ children }: any) => {
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
