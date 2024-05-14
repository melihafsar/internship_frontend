import { useUtil } from "@/context/UtilContext";
import { InternshipPostingFormTypes } from "@/schemas/internship-posting.schema";
import { useEffect, useState } from "react";
import CompanyService from "@/services/company.service";
import { useLocation } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

function ApplicationsDetailPage() {
  const [posting, setPosting] = useState({} as InternshipPostingFormTypes);
  const { setLoading } = useUtil();
  const location = useLocation();
  const postingId = Number(location.pathname.split("/")[2]);
  const { toast } = useToast();

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

  return <div>ApplicationsDetailPage</div>;
}

export default ApplicationsDetailPage;
