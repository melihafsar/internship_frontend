import { CompanyFormTypes, useCompanyForm } from "@/schemas/company-form.schema";
import CompanyForm from "./components/CompanyForm";
import { useEffect, useState } from "react";
import CompanyService from "@/services/company.service";
import { useToast } from "@/components/ui/use-toast";
import { showErrors } from "@/utils/helpers.utils";


export const MyCompany = () => {
    const { form } = useCompanyForm();
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
          } catch (error : any) {
            showErrors(form, error);
            toast({
              title: "Hata",
              description: "Özel bilgiler eklenirken bir hata oluştu.",
              variant: "destructive",
            });
          }
          setLoading(false);
    }

    const fetchCompany = async () => {
      setLoading(true);
        try {
          const response = await CompanyService.getCompany();
          form.reset(response.data);
        } catch {
          toast({
            title: "Hata",
            description: "Şirket bilgileri getirilirken bir hata oluştu.",
          });
        }
        setLoading(false);
      }

    useEffect(() => {
      fetchCompany();
    }, [])
    

    return <CompanyForm loading={loading} form={form} handleFormSubmit={handleFormSubmit}/>
};
export default MyCompany;