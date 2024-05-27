import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { useUtil } from "@/context/UtilContext";
import CompanyService from "@/services/company.service";
import { DetailedCompanyDto } from "@/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CompanyInfoFields from "../MyCompany/components/CompanyInfoFields";

function CompanyPortfolio() {
  const [activeTab, setActiveTab] = useState("contact");
  const { loading, setLoading } = useUtil();
  const { toast } = useToast();
  const [detailedCompany, setDetailedCompany] = useState<DetailedCompanyDto>();
  let { id } = useParams();

  const getData = async () => {
    setLoading(true);
    try {
      const companyDetail = await CompanyService.getDetailedCompany(
        parseInt(id)
      );
      setDetailedCompany(companyDetail.data);
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

  if (loading)
    return (
      <div className="flex flex-col justify-center space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <div className="flex-1 max-w-[1400px]">
          <Skeleton className="w-full h-[800px]" />
        </div>
      </div>
    );

  return (
    <div className="flex flex-col justify-center space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
      <div className="flex-1 max-w-[1400px]">
        <CompanyInfoFields company={detailedCompany} isReadonly={true} />
      </div>
    </div>
  );
}

export default CompanyPortfolio;
