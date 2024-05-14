import { UserDetail } from "@/types";
import React, { createContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "./AuthContext";
import { getUserType } from "@/utils/helpers.utils";
import { useToast } from "@/components/ui/use-toast";
import ProfileService from "@/services/profile.service";
import CompanyService from "@/services/company.service";
import { CompanyFormTypes } from "@/schemas/company-form.schema";

interface UserContextProps {
  userDetailData: UserDetail;
  setUserDetailData: React.Dispatch<React.SetStateAction<UserDetail>>;
  companyDetail: CompanyFormTypes;
  setCompanyDetail: React.Dispatch<React.SetStateAction<CompanyFormTypes>>;
  userType: number | null;
}

export const UserContext = createContext<UserContextProps>({
  userDetailData: {} as UserDetail,
  setUserDetailData: () => {},
  companyDetail: {} as CompanyFormTypes,
  setCompanyDetail: () => {},
  userType: null,
});

export const UserProvider = ({ children }: any) => {
  const [userDetailData, setUserDetailData] = useState<UserDetail>(
    {} as UserDetail
  );
  const [userType, setUserType] = useState<number | null>(null);
  const [companyDetail, setCompanyDetail] = useState<CompanyFormTypes>(
    {} as CompanyFormTypes
  );

  const { supabase } = useAuth();
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      const type = getUserType(session);
      type === 0 && fetchUserInfo();
      type === 1 && fetchCompanyInfo();
      setUserType(type);
    });
    return () => {
      data?.subscription.unsubscribe();
    };
  }, []);

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

  const fetchCompanyInfo = async () => {
    try {
      const response = await CompanyService.getCompany();
      if (response.data === null)
        toast({
          title: "Şirket Bilgileri Eksik!",
          description:
            "Lütfen şirket bilgilerinizi ekleyin. Şirket bilgileriniz olmadan ilan oluşturamazsınız.",
        });
      setCompanyDetail(response.data);
    } catch {
      toast({
        title: "Hata",
        description: "Şirket bilgileri getirilirken bir hata oluştu.",
      });
    }
  };

  const value = useMemo(
    () => ({
      userDetailData,
      setUserDetailData,
      userType,
      companyDetail,
      setCompanyDetail,
    }),
    [userDetailData, companyDetail]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within an UserProvider");
  }
  return context;
};
