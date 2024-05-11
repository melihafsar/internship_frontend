import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";
import { useUser } from "@/context/UserContext";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useNavigate } from "react-router-dom";

export const CompanyDropdown = () => {
  const { supabase } = useAuth();
  const navigate = useNavigate();
  const { companyDetail } = useUser();

  const CompanyAvatar = () => {
    return (
      <div className="flex justify-center items-center space-x-2">
        {companyDetail?.name && (
          <Avatar className="w-8 h-8">
            <AvatarImage src={companyDetail?.logo_url} alt="profil_resmim" />
            <AvatarFallback>{companyDetail?.name?.slice(0, 2)}</AvatarFallback>
          </Avatar>
        )}
        <h3 className="text-sm font-semibold truncate">
          {companyDetail?.name || "Şirketim"}
        </h3>
      </div>
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="ml-1">
        <Button variant="ghost">{CompanyAvatar()}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => navigate("/my-company")}>
            Şirketim
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate("/my-posting")}>
            İlanlarım
            <DropdownMenuShortcut>⌘M</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Yardım
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={async () => {
            await supabase.auth.signOut();
            await supabase.auth.refreshSession();
            navigate("/login");
          }}
        >
          Çıkış Yap
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
