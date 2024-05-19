import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { useUtil } from "@/context/UtilContext";
import CompanyService from "@/services/company.service";
import { DetailedCompanyDto } from "@/types";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import CompanyNavigationItems from "../MyCompany/components/CompanyNavigationItems";
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
      const companyDetail = await CompanyService.getDetailedCompany(parseInt(id));
      setDetailedCompany(companyDetail.data);
    }
    catch (error) {
      console.error(error);
      toast({
        title: "Hata",
        description: "Şirket detayları getirilirken bir hata oluştu.",
        variant: "destructive",
      });
    }
    finally {
      setLoading(false);
    }

  }

  useEffect(() => {
    getData();
  }, []);

  if (loading)
    return <div className="pb-2 scroll-smooth">
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="bg-primary-foreground rounded-md lg:bg-transparent lg:w-1/5 sticky top-0 z-30">
          <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1 overflow-x-auto py-2 sticky top-2">
            <Skeleton className="w-full h-[400px]" />
          </nav>
        </aside>
        <div className="flex-1 max-w-[1400px]">
          <Skeleton className="w-full h-[800px]" />
        </div>
      </div>
    </div>;;

  return <div className="pb-2 scroll-smooth">
    <Separator className="my-6" />
    <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
      <aside className="bg-primary-foreground rounded-md lg:bg-transparent lg:w-1/5 sticky top-0 z-30">
        <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1 overflow-x-auto py-2 sticky top-2">
          <CompanyNavigationItems activeTab={activeTab} />
        </nav>
      </aside>
      <div className="flex-1 max-w-[1400px]">
        <CompanyInfoFields company={detailedCompany} isReadonly={true} />
      </div>
    </div>
  </div>;
}

export default CompanyPortfolio;

// const [isFollowingCompany, setIsFollowingCompany] = useState(
//   posting?.company?.is_current_user_following || false
// ); //TODO: bu kısımdaki state posting üstünden çekilmeyecek.

// const handleFollowCompanyClick = async () => {
//   try {
//     await internshipService.followCompany(
//       posting.company?.company_id,
//       !isFollowingCompany
//     );
//     setIsFollowingCompany(!isFollowingCompany);
//   } catch (error) {
//     toast({
//       title: "Hata",
//       description: "Şirket takip edilirken bir hata oluştu.",
//       variant: "destructive",
//     });
//   }
// };

{
  /* //Todo: Yorum satırına alınan alanlar Şirket detail sayfasında olacak.  */
}
{
  /* <Button
              variant="default"
              className="flex font-semibold rounded-md w-52 gap-2 justify-center m-0 md:mr-16"
              size="sm"
              onClick={handleFollowCompanyClick}
              disabled={!(userType === 0)}
            >
              <BellRing
                fill={isFollowingCompany ? "currentColor" : "none"}
                size={16}
              />
              Şirket{isFollowingCompany ? " Takip Ediliyor" : "i Takip Et"}
            </Button> */
}
