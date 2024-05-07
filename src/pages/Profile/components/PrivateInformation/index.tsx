import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { useUtil } from "@/context/UtilContext";
import { UserDetail } from "@/types";
import { Plus } from "lucide-react";
import { useRef, useState } from "react";
import ProfileService from "@/services/profile.service";
import {
  PrivateInformationFormTypes,
  usePrivateInformationForm,
} from "@/schemas/private-information-schema";
import PrivateInfoForm from "./PrivateInfoForm";
import moment from "moment";
import { showAccordionInProfile } from "@/utils/helpers.utils";

interface PrivateInformationProps {
  user: UserDetail;
}

function PrivateInformation({ user }: PrivateInformationProps) {
  const [showForm, setShowForm] = useState(false);
  const { loading, setLoading } = useUtil();
  const { toast } = useToast();
  const formDivRef = useRef<HTMLDivElement>(null);

  const handleFormSubmit = async (
    data: PrivateInformationFormTypes,
    e: any
  ) => {
    e.preventDefault();
    try {
      setLoading(true);
      await ProfileService.updateUserDetails({
        ...data,
        date_of_birth: data.date_of_birth
          ? moment(data.date_of_birth).format("YYYY-MM-DD")
          : undefined,
      });
      toast({
        title: "Başarılı",
        description: "Özel bilgiler başarıyla eklendi.",
        variant: "success",
      });
      setShowForm(false);
    } catch (error) {
      toast({
        title: "Hata",
        description: "Özel bilgiler eklenirken bir hata oluştu.",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center w-full my-2">
        <h5 className="text-sm font-medium my-2">Eklediğim Özel Bilgilerim</h5>
        <Button
          onClick={() =>
            showAccordionInProfile(showForm, formDivRef, setShowForm)
          }
          variant="outline"
          className="flex items-center space-x-2 mb-2"
        >
          <Plus className="h-4 w-4 mr-2" />
          Özel Bilgi Ekleyin veya Düzenleyin
        </Button>
      </div>
      <Accordion
        type="single"
        collapsible
        value={showForm ? "education" : undefined}
      >
        <AccordionItem value="education" ref={formDivRef}>
          <AccordionContent>
            <Separator className="my-1" />
            <PrivateInfoForm
              form={usePrivateInformationForm().form}
              loading={loading}
              handleFormSubmit={handleFormSubmit}
              initialValues={user.detail}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}

export default PrivateInformation;
