import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { UserDetail } from "@/types";

interface ProfileDropdownProps {
  user: UserDetail;
}

export const ProfileDropdown = ({ user }: ProfileDropdownProps) => {
  const { supabase } = useAuth();
  const navigate = useNavigate();

  const ProfileAvatar = () => {
    return (
      <div className="flex justify-center items-center space-x-2">
        <Avatar className="w-8 h-8">
          <AvatarImage src={user?.profile_photo_url} alt="profil_resmim" />
          <AvatarFallback>
            {user?.name && user?.surname
              ? user?.name?.charAt(0) + user?.surname?.charAt(0)
              : user?.email?.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <h3 className="text-sm font-semibold">
          {user?.name && user?.surname
            ? `${user.name} ${user.surname}`
            : user?.email}
        </h3>
      </div>
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">{ProfileAvatar()}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{ProfileAvatar()}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => navigate("/profile")}>
            Profilim
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Mesajlarım
            <Badge className="ml-2 rounded-full">3</Badge>
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
