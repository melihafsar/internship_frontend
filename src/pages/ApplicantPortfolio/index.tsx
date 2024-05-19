import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { useUtil } from "@/context/UtilContext";
import CompanyService from "@/services/company.service";
import { DetailedPostingApplication } from "@/types";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import UserInfoFields from "../Profile/components/UserInfoFields";
import { Separator } from "@/components/ui/separator";
import NavigationItems from "../Profile/components/NavigationItems";
import { IsReadonlyProvider } from "@/context/IsReadonlyContext";

function ApplicantPortfolio() {
  const { loading, setLoading } = useUtil();
  const { toast } = useToast();
  const [detailedPosting, setDetailedPosting] = useState<DetailedPostingApplication>();
  let { id } = useParams();
  const [activeTab, setActiveTab] = useState("contact");
  const location = useLocation();

  useEffect(() => {
    if (location.hash) setActiveTab(location?.hash?.slice(1));
  }, [location.hash]);

  const getData = async () => {
    setLoading(true);
    try {
      const companyDetail = await CompanyService.getApplicationsDetail(
        parseInt(id)
      );
      setDetailedPosting(companyDetail.data);
    } catch (error) {
      console.error(error);
      toast({
        title: "Hata",
        description: "Şirket detayları getirilirken bir hata oluştu.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading || !detailedPosting)
    return (
      <div className="flex flex-col justify-center space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <div className="flex-1 max-w-[1400px]">
          <Skeleton className="w-full h-[800px]" />
        </div>
      </div>
    );

  return <IsReadonlyProvider isReadonly={true} >
    <div className="pb-2 scroll-smooth">
      <p className="text-muted-foreground">
        Başvuran bilgilerini görüntüleyebilir ve iletişime geçebilirsiniz.
      </p>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="bg-primary-foreground rounded-md lg:bg-transparent lg:w-1/5 sticky top-0 z-30">
          <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1 overflow-x-auto py-2 sticky top-2">
            <NavigationItems activeTab={activeTab} />
          </nav>
        </aside>
        <div className="flex-1 max-w-[1400px]">
          <UserInfoFields user={detailedPosting} />
        </div>
      </div>
    </div>
  </IsReadonlyProvider>

}

export default ApplicantPortfolio;
