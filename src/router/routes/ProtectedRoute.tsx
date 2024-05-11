import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Page from "@/layouts/Page";
import { useUtil } from "@/context/UtilContext";
import Spinner from "@/components/Spinner";
import { useAuth } from "@/context/AuthContext.tsx";
import { getUserType } from "@/utils/helpers.utils.ts";

interface ProtectedRouteProps {
  component: React.ElementType;
  userType?: number;

  [key: string]: any;

  fixPageHeight?: boolean;
}

const fixPageHeightClassName = "overflow-hidden h-[calc(100vh-80px-4rem)]";

const ProtectedRoute = ({
  component: Component,
  userType,
  title,
  authenticated,
  fixPageHeight = false,
  ...rest
}: ProtectedRouteProps) => {
  const { loading, setLoading } = useUtil();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const { supabase } = useAuth();
  const navigate = useNavigate();
  const [userTypeState, setUserTypeState] = useState<number | null>(null);

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
      setIsLoggedIn(true);
      setLoading(false);
    });
    return () => {
      data?.subscription.unsubscribe();
    };
  }, []);

  const userAccessGranted =
    userType !== undefined ? userType === userTypeState : true;

  if (loading || isLoggedIn == null) return <Spinner />;
  if (isLoggedIn && userAccessGranted)
    return (
      <Page
        title={title}
        className={fixPageHeight ? fixPageHeightClassName : ""}
      >
        <Component {...rest} />
      </Page>
    );
  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
