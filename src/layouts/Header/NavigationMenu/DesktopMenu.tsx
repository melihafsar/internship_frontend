import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { mainRoutes } from "@/router/routes/main.routes";
import { matchPath, useLocation, useNavigate } from "react-router-dom";
import { ProfileDropdown } from "./ProfileDropdown";
import { CompanyDropdown } from "./CompanyDropdown";
import { getUserType } from "@/utils/helpers.utils.ts";
import { useAuth } from "@/context/AuthContext.tsx";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext.tsx";

function DesktopMenu() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { supabase } = useAuth();
  const [filteredRoutes, setFilteredRoutes] = useState<any[]>([]);
  const { userDetailData } = useUser();

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      const type = getUserType(session);
      const routes = mainRoutes.filter((route) => {
        if (route.showNavBar && route.userType !== undefined) {
          return (
            route.userType === type ||
            (type === undefined && route.userType === -1)
          );
        }
        return route.showNavBar;
      });
      setFilteredRoutes(routes);
    });
    return () => {
      data?.subscription.unsubscribe();
    };
  }, []);

  const match = (path: string) => {
    if (path && path?.split("/")?.length < 4) {
      return path === "/"
        ? path === pathname
        : !!matchPath({ path, end: false }, pathname);
    } else if (path && path?.split("/")?.length >= 4) {
      return path === pathname;
    }
    return false;
  };

  const renderLinkButton = (route: any) => {
    return (
      <Button
        variant="ghost"
        className={cn(
          typeof route.meta.title === "string" ? "" : "",
          match(route.path) ? "bg-orange-500 text-white" : ""
        )}
        onClick={() => navigate(route.path)}
      >
        {route.meta.title}
      </Button>
    );
  };

  const renderComponent = (route: {
    meta: {
      title: string;
    };
  }) => {
    if (route.meta.title === "Profilim")
      return <ProfileDropdown user={userDetailData} />;
    else if (route.meta.title === "Şirketim") return <CompanyDropdown />;
    else return renderLinkButton(route);
  };

  return (
    <ul className="flex flex-row space-x-2">
      {filteredRoutes?.length > 0 &&
        filteredRoutes.map((route: any) => (
          <li key={route.path}>{renderComponent(route)}</li>
        ))}
    </ul>
  );
}

export default DesktopMenu;
