import { useUtil } from "@/context/UtilContext";
import { InternshipPostingFormTypes } from "@/schemas/internship-posting.schema";
import { useEffect, useState } from "react";
import CompanyService from "@/services/company.service";
import { useLocation } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import CompanyInfoBanner from "./CompanyInfoBanner";
import CompanyTabsComponent from "./CompanyTabsComponent";
import { useAuth } from "@/context/AuthContext";
import { getUserType } from "@/utils/helpers.utils.ts";

function ApplicationsDetailPage() {
  const [posting, setPosting] = useState({} as InternshipPostingFormTypes);
  const { setLoading } = useUtil();
  const location = useLocation();
  const postingId = Number(location.pathname.split("/")[2]);
  const { toast } = useToast();
  const { supabase } = useAuth();
  const [userType, setUserType] = useState<number | null>(null);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      const type = getUserType(session);
      setUserType(type);
    });

    return () => {
      data?.subscription.unsubscribe();
    };
  }, []);

  const fetchPostingDetail = async () => {
    setLoading(true);
    try {
      const response = await CompanyService.getPostingDetail(postingId);
      setPosting(response.data);
    } catch (error) {
      toast({
        title: "Hata",
        description: "Staj ilanı detayları getirilirken bir hata oluştu.",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPostingDetail();
  }, []);

  return (
    <div className="flex flex-col w-full">
      <CompanyInfoBanner posting={posting} userType={userType} />
      <CompanyTabsComponent posting={posting} userType={userType} />
    </div>
  );
}

export default ApplicationsDetailPage;
