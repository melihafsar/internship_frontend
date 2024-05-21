import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { getUserInfo } from "@/utils/helpers.utils";
import { useLocation, useNavigate } from "react-router-dom";

export default function Page({
  title,
  children,
  className,
  showTitle = true,
}: {
  title: string;
  children: React.ReactNode;
  className: string;
  showTitle?: boolean;
}) {
  const defaultStyle = "flex flex-col flex-1 p-4";

  const { supabase } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      const user = getUserInfo(session);
      if (
        (user.userName === null || user.userSurname === null) &&
        user.userType !== undefined &&
        location.pathname !== "/profile"
      ) {
        navigate("/profile", { state: "username required" });
      }
    });
    return () => {
      data?.subscription.unsubscribe();
    };
  }, []);

  return (
    <div className={cn(defaultStyle, className)}>
      <Helmet>
        <title>{`${title} | Marmara`}</title>
        <meta name="description" content="Marmara - Staj Platformu" />
      </Helmet>
      {showTitle && <h1 className="text-[1.4rem] font-bold mb-2">{title}</h1>}
      {children}
    </div>
  );
}
