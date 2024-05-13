import {
  CompanyFormTypes,
  useCompanyForm,
} from "@/schemas/company-form.schema";
import CompanyForm from "./CompanyForm";
import CompanyService from "@/services/company.service";
import { useToast } from "@/components/ui/use-toast";
import { showAccordionInProfile, showErrors } from "@/utils/helpers.utils";
import { useEffect, useRef, useState } from "react";
import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";

import CompanyBanner from "./CompanyBanner";

interface CompanyDetailProps {
  company: CompanyFormTypes;
}

function index({ company }: CompanyDetailProps) {
  const { form } = useCompanyForm();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const formDivRef = useRef<HTMLDivElement>(null);
  const [showForm, setShowForm] = useState(false);
  const [companyData, setCompanyData] = useState<CompanyFormTypes>(company);
  const [companyImages, setCompanyImages] = useState({
    logo: "",
    background: "",
  });

  const handleFormSubmit = async (data: CompanyFormTypes) => {
    try {
      setLoading(true);
      await CompanyService.updateCompany({ ...data });
      toast({
        title: "Başarılı",
        description: "Özel bilgiler başarıyla eklendi.",
        variant: "success",
      });
    } catch (error: any) {
      showErrors(form, error);
      toast({
        title: "Hata",
        description: "Özel bilgiler eklenirken bir hata oluştu.",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  const fetchCompany = async () => {
    setLoading(true);
    try {
      const response = await CompanyService.getCompany();
      form.reset(response.data);
      setCompanyData(response.data);
      setCompanyImages({
        logo: response.data?.logo_url || "./no-image.svg",
        background: response.data?.background_photo_url || "./no-image.svg",
      });
    } catch {
      toast({
        title: "Hata",
        description: "Şirket bilgileri getirilirken bir hata oluştu.",
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCompany();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <CompanyBanner
          form={form}
          companyImages={companyImages}
          setCompanyImages={setCompanyImages}
          handleFormSubmit={handleFormSubmit}
        />
        <Button
          onClick={() =>
            showAccordionInProfile(showForm, formDivRef, setShowForm)
          }
          variant="outline"
          className="flex items-center space-x-2 mb-2"
        >
          <Edit className="h-4 w-4 mr-2" />
          Şirket Bilgilerini Düzenle
        </Button>
      </div>
      <Accordion
        type="single"
        collapsible
        value={showForm ? "company_detail" : undefined}
      >
        <AccordionItem value="company_detail" ref={formDivRef}>
          <AccordionContent>
            <Separator className="my-2" />
            <CompanyForm
              loading={loading}
              form={form}
              handleFormSubmit={handleFormSubmit}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default index;
