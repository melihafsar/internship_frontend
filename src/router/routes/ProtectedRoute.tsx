import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Page from "@/layouts/Page";
import { UtilProvider, useUtil } from "@/context/UtilContext";
import Spinner from "@/components/Spinner";
import { useAuth } from "@/context/AuthContext.tsx";
import { getUserInfo, getUserType } from "@/utils/helpers.utils.ts";
import { cn } from "@/lib/utils";
import { lazy } from "react";
interface ProtectedRouteProps {
  component: React.ElementType;
  userType?: number;
  [key: string]: any;
  fixPageHeight?: boolean;
  showTitle?: boolean;
  className?: string;
}

const fixPageHeightClassName = "overflow-hidden h-[calc(100vh-80px-4rem)]";

const ProtectedRoute = ({
  component: Component,
  userType,
  title,
  authenticated,
  fixPageHeight = false,
  showTitle = true,
  className,
  ...rest
}: ProtectedRouteProps) => {
  const { loading, setLoading } = useUtil();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const { supabase } = useAuth();
  const navigate = useNavigate();
  const [userTypeState, setUserTypeState] = useState<number | null>(null);
  const location = useLocation();
  const [userInfo, setUserInfo] = useState<{
    userType: number | null;
    userName: string | null;
    userSurname: string | null;
    userEmail: string | null;
  }>({
    userType: null,
    userName: null,
    userSurname: null,
    userEmail: null,
  });

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      setLoading(true);
      if (!session) {
        navigate("/login");
        setIsLoggedIn(false);
        setLoading(false);
        return;
      }
      setUserTypeState(getUserType(session));
      setUserInfo(getUserInfo(session));
      setIsLoggedIn(true);
      setLoading(false);
    });
    return () => {
      data?.subscription.unsubscribe();
    };
  }, [supabase.auth]);

  const userAccessGranted =
    userType !== undefined ? true : userType === userTypeState;

  if (loading || isLoggedIn === null) return <Spinner />;
  if (
    isLoggedIn &&
    userAccessGranted &&
    location.pathname !== "/profile" &&
    (userInfo.userName === null || userInfo.userSurname === null)
  ) {
    return <Navigate to="/profile" state="username required" />;
  }
  if (isLoggedIn && userAccessGranted) {
    return (
      <Page
        title={title}
        className={cn(className, fixPageHeight && fixPageHeightClassName)}
        showTitle={showTitle}
      >
        <UtilProvider>
          <Component {...rest} />
        </UtilProvider>
      </Page>
    );
  }
  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
