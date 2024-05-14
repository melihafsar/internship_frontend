import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Separator } from "@radix-ui/react-dropdown-menu";
import CompanyInfoFields from "./components/CompanyInfoFields";
import CompanyNavigationItems from "./components/CompanyNavigationItems";
import { useUser } from "@/context/UserContext";
import CompanyService from "@/services/company.service";
import { CompanyFormTypes } from "@/schemas/company-form.schema";

export const MyCompany = () => {
  const [activeTab, setActiveTab] = useState("contact");
  // const { companyDetail } = useUser();
  const location = useLocation();
  const [companyData, setCompanyData] = useState<CompanyFormTypes>();

  useEffect(() => {
    if (location.hash) setActiveTab(location.hash.slice(1));
  }, [location.hash]);

  const fetchCompany = async () => {
    try {
      const response = await CompanyService.getCompany();

      setCompanyData(response.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchCompany();
  }, []);

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
            <CompanyNavigationItems activeTab={activeTab} />
          </nav>
        </aside>
        <div className="flex-1 max-w-[1400px]">
          <CompanyInfoFields company={companyData} />
        </div>
      </div>
    </div>
  );
};

export default MyCompany;
