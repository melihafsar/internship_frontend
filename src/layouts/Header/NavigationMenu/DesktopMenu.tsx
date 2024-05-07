import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { mainRoutes } from "@/router/routes/main.routes";
import { matchPath, useLocation, useNavigate } from "react-router-dom";
import { ProfileDropdown } from "./ProfileDropdown";

function DesktopMenu() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

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

  return (
    <ul className="flex flex-row space-x-2">
      {mainRoutes.map((route) => (
        <li key={route.path}>
          {route.meta.title !== "Profilim" ? (
            <Button
              variant="ghost"
              className={cn(
                typeof route.meta.title === "string" ? "w-28" : "",
                match(route.path) ? "bg-orange-500 text-white" : ""
              )}
              onClick={() => navigate(route.path)}
            >
              {route.meta.title}
            </Button>
          ) : (
            <ProfileDropdown />
          )}
        </li>
      ))}
    </ul>
  );
}

export default DesktopMenu;
