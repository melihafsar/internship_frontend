import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NavigationItems from "./components/NavigationItems";
import UserInfoFields from "./components/UserInfoFields";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@/context/UserContext";
import ProfileService from "@/services/profile.service";

function Profile() {
  const [activeTab, setActiveTab] = useState("contact");
  const location = useLocation();
  const { userDetailData, setUserDetailData } = useUser();
  const { toast } = useToast();

  const fetchUserInfo = async () => {
    try {
      const response = await ProfileService.getUserInfo();
      setUserDetailData(response.data);
    } catch {
      toast({
        title: "Hata",
        description: "Kullanıcı bilgileri getirilirken bir hata oluştu.",
      });
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  useEffect(() => {
    if (location.hash) setActiveTab(location.hash.slice(1));
  }, [location.hash]);

  return (
    <div className="pb-2 scroll-smooth">
      <p className="text-muted-foreground">
        Profil bilgilerinizi güncelleyebilir ve diğer kullanıcılar tarafından
        görülecek şekilde ayarlayabilirsiniz.
      </p>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="bg-primary-foreground rounded-md lg:bg-transparent lg:w-1/5 sticky top-0 z-30">
          <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1 overflow-x-auto py-2 sticky top-2">
            <NavigationItems activeTab={activeTab} />
          </nav>
        </aside>
        <div className="flex-1 max-w-[1400px]">
          <UserInfoFields user={userDetailData} setUser={setUserDetailData} />
        </div>
      </div>
    </div>
  );
}

export default Profile;
