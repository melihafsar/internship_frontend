import { useRef, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useUtil } from "@/context/UtilContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { useForeignLanguagesForm } from "@/schemas/foreign-languages-form.schema";
import ForeignLanguagesForm from "./ForeignLanguagesForm";
import ForeignLanguageCard from "./ForeignLanguageCard";
import { UserDetail } from "@/types";
import ProfileService from "@/services/profile.service";
import { showAccordionInProfile } from "@/utils/helpers.utils";
import { useIsReadonly } from "@/context/IsReadonlyContext";

interface ForeignLanguagesProps {
  user: UserDetail;
}

function ForeignLanguages({ user }: ForeignLanguagesProps) {
  const [showForm, setShowForm] = useState(false);
  const { loading, setLoading } = useUtil();
  const { toast } = useToast();
  const formDivRef = useRef<HTMLDivElement>(null);
  const isReadonly = useIsReadonly();

  const handleFormSubmit = async (data: {
    language_code: string;
    degree: string;
  }) => {
    try {
      setLoading(true);
      await ProfileService.addNewForeignLanguage(data);
      toast({
        title: "Başarılı",
        description: "Yeni yabancı dil bilgisi başarıyla eklendi.",
        variant: "success",
      });
      setShowForm(false);
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Hata",
        description: "Yabancı dil bilgisi eklenirken bir hata oluştu.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center w-full my-2">
        <h5 className="text-md font-medium my-2">
          {!isReadonly ? "Eklediğim Yabancı Dil Bilgilerim" : "Yabancı Dil Bilgileri"}
          <Badge className="ml-2" variant="secondary">
            {user.foreign_languages?.length}
          </Badge>
        </h5>
        {!isReadonly && <Button
          onClick={() =>
            showAccordionInProfile(showForm, formDivRef, setShowForm)
          }
          variant="outline"
          className="flex items-center space-x-2 mb-2"
        >
          <Plus className="h-4 w-4 mr-2" />
          Yabancı Dil Bilgisi Ekleyin
        </Button>}
      </div>
      {user.foreign_languages?.length > 0 && (
        <div className="flex flex-col">
          <Separator className="my-1" />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
            {user.foreign_languages.map((foreignLanguage) => (
              <ForeignLanguageCard
                key={foreignLanguage.id}
                foreignLanguage={foreignLanguage}
              />
            ))}
          </div>
        </div>
      )}
      <Accordion
        type="single"
        collapsible
        value={showForm ? "foreignLanguage" : undefined}
      >
        <AccordionItem value="foreignLanguage" ref={formDivRef}>
          <AccordionContent>
            <Separator className="my-1" />
            <ForeignLanguagesForm
              form={useForeignLanguagesForm().form}
              loading={loading}
              handleFormSubmit={handleFormSubmit}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}

export default ForeignLanguages;
