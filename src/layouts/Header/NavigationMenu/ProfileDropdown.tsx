import React from "react";
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

interface ProfileDropdownProps {}

export const ProfileDropdown: React.FC<ProfileDropdownProps> = () => {
  const { supabase } = useAuth();
  const navigate = useNavigate();
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
          onClick={() => {
            supabase.auth.signOut();
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

const ProfileAvatar = () => {
  return (
    <div className="flex justify-center items-center space-x-2">
      <Avatar className="w-8 h-8">
        <AvatarImage
          src="https://media.licdn.com/dms/image/D4D03AQFKXnb4_37upQ/profile-displayphoto-shrink_400_400/0/1704967127601?e=1714608000&v=beta&t=TS23KpCiHUQup8RoH9Wmvw90_GTnlAN0jbBimuk_wbg"
          alt="profil_resmim"
        />
        <AvatarFallback>MA</AvatarFallback>
      </Avatar>
      <h3 className="text-sm font-semibold">Melih Afşar</h3>
    </div>
  );
};
