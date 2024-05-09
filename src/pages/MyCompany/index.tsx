import { CompanyFormTypes, useCompanyForm } from "@/schemas/company-form.schema";
import CompanyForm from "./components/CompanyForm";
import { useState } from "react";
import CompanyService from "@/services/company.service";
import { useToast } from "@/components/ui/use-toast";


export const MyCompany = () => {
    const formHandle = useCompanyForm();
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    
    const handleFormSubmit = async (data : CompanyFormTypes) => {
        try {
            setLoading(true);
            await CompanyService.updateCompany({...data});
            toast({
              title: "Başarılı",
              description: "Özel bilgiler başarıyla eklendi.",
              variant: "success",
            });
          } catch (error) {
            toast({
              title: "Hata",
              description: "Özel bilgiler eklenirken bir hata oluştu.",
              variant: "destructive",
            });
          }
          setLoading(false);
    }

    return <CompanyForm loading={loading} form={formHandle.form} handleFormSubmit={handleFormSubmit}/>
};
export default MyCompany;