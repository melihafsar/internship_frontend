import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Page from "@/layouts/Page";
import { useUtil } from "@/context/UtilContext";
import Spinner from "@/components/Spinner";

interface ProtectedRouteProps {
  component: React.ElementType;
  [key: string]: any;
  fixPageHeight?: boolean;
}

const fixPageHeightClassName = "overflow-hidden h-[calc(100vh-80px-4rem)]";

const ProtectedRoute = ({
  component: Component,
  title,
  authenticated,
  fixPageHeight = false,
  ...rest
}: ProtectedRouteProps) => {
  const { session } = useAuth();
  const { loading, setLoading } = useUtil();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  const validateSession = async () => {
    setLoading(true);
    if (!session) {
      return;
    }
    const result = await session;
    if (result) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    validateSession();
  }, []);

  if (loading || isLoggedIn == null) return <Spinner />;
  if (isLoggedIn)
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
