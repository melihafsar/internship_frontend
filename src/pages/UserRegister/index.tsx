import Spinner from "@/components/Spinner";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import ProfileService from "@/services/profile.service";
import UserService from "@/services/user.service";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function index() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { supabase } = useAuth();

  const updateUserType = async () => {
    const searchParams = new URLSearchParams(location.search.toString());
    const userType = searchParams.get("userType");

    if (!userType) {
      toast({
        title: "Hata",
        description: "Lütfen tekrar giriş yapın.",
        variant: "destructive",
      });
      setTimeout(() => {
        navigate("/login");
      }, 1000);
      return;
    }

    try {
      await ProfileService.updateUserInfo({
        account_type: userType!,
      }).then(async () => {
        await supabase.auth.refreshSession();
        navigate("/");
      });
    } catch (error) {
      toast({
        title: "Hata",
        description: "Lütfen tekrar giriş yapın.",
        variant: "destructive",
      });
      console.log(error);
    }
  };

  const register = async () => {
    console.log("register");
    await supabase.auth.getSession();
    try {
      await UserService.isRegistered().then(
        ({ is_registered }: { is_registered: boolean }) => {
          if (is_registered) navigate("/");
          else updateUserType();
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    register();
  }, []);

  return <Spinner />;
}

export default index;
