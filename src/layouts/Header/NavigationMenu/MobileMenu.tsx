import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { mainRoutes } from "@/router/routes/main.routes";
import { useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { getUserType } from "@/utils/helpers.utils.ts";

function MobileMenu() {
  const navigate = useNavigate();
  const { supabase } = useAuth();
  const [filteredRoutes, setFilteredRoutes] = useState<any[]>([]);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      const type = getUserType(session);
      setIsSignedIn(type !== undefined);
      const routes = mainRoutes.filter((route) => {
        if (route.showNavBar && route.userType !== undefined) {
          return route.userType === type || (type === undefined && route.userType === -1);
        }
        return route.showNavBar;
      });
      setFilteredRoutes(routes);
    });
    return () => {
      data?.subscription.unsubscribe();
    };
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Menu />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          {filteredRoutes.map((route) => (
            <DropdownMenuItem
              key={route.path}
              onClick={() => navigate(route.path)}
            >
              {route.meta.title}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>

        {isSignedIn && <>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={async () => {
              await supabase.auth.signOut();
              navigate("/login");
            }}
          >
            Çıkış Yap
          </DropdownMenuItem></>}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default MobileMenu;
