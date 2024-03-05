import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
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

  useEffect(() => {
    setLoading(true);
    if (session !== undefined || session !== null) setLoading(false);
  }, [session]);

  if (loading) return <Spinner />;

  return session !== null && !loading ? (
    <Page title={title} className={fixPageHeight ? fixPageHeightClassName : ""}>
      <Component {...rest} />
    </Page>
  ) : (
    !loading && <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;
