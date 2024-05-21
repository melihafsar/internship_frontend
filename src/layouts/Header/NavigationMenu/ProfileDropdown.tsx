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
import { InternNotificationMessage, UserDetail } from "@/types";
import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";

interface ProfileDropdownProps {
  user: UserDetail;
}

export const ProfileDropdown = ({ user }: ProfileDropdownProps) => {
  const { supabase } = useAuth();
  const navigate = useNavigate();
  const { fetchMessages } = useUser();
  const [messages, setMessages] = useState<InternNotificationMessage[]>([]);

  const getMessages = async () => {
    const messages = await fetchMessages();
    setMessages(messages?.data ?? []);
  };

  useEffect(() => {
    getMessages();
  }, []);

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
        <h3 className="text-sm font-semibold max-w-40 truncate">
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
        <Button variant="ghost" className="max-w-56 truncate">
          {ProfileAvatar()}
        </Button>
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
            <Badge className="ml-2 rounded-full">
              {messages.length > 0 ? messages.length : 0}
            </Badge>
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
