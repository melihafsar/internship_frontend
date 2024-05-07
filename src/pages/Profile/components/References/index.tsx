import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { useUtil } from "@/context/UtilContext";
import { UserDetail } from "@/types";
import { Plus } from "lucide-react";
import { useRef, useState } from "react";
import ProfileService from "@/services/profile.service";
import {
  ReferencesFormTypes,
  useReferencesForm,
} from "@/schemas/references-form.schema";
import ReferenceCard from "./ReferenceCard";
import ReferenceForm from "./ReferenceForm";
import { showAccordionInProfile } from "@/utils/helpers.utils";

interface ReferencesProps {
  user: UserDetail;
}

function References({ user }: ReferencesProps) {
  const [showForm, setShowForm] = useState(false);
  const { loading, setLoading } = useUtil();
  const { toast } = useToast();
  const formDivRef = useRef<HTMLDivElement>(null);

  const handleFormSubmit = async (data: ReferencesFormTypes, e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      await ProfileService.addNewReference(data);
      toast({
        title: "Başarılı",
        description: "Yeni referans başarıyla eklendi.",
        variant: "success",
      });
      setShowForm(false);
    } catch (error) {
      toast({
        title: "Hata",
        description: "Referans eklenirken bir hata oluştu.",
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
          Eklediğim Referanslarım
          <Badge className="ml-2" variant="secondary">
            {user.references?.length}
          </Badge>
        </h5>
        <Button
          onClick={() =>
            showAccordionInProfile(showForm, formDivRef, setShowForm)
          }
          variant="outline"
          className="flex items-center space-x-2 mb-2"
        >
          <Plus className="h-4 w-4 mr-2" />
          Referans Bilgisi Ekleyin
        </Button>
      </div>
      {user.references?.length > 0 && (
        <>
          <Separator className="my-1" />
          {user.references.map((reference) => (
            <ReferenceCard key={reference.id} reference={reference} />
          ))}
        </>
      )}
      <Accordion
        type="single"
        collapsible
        value={showForm ? "reference" : undefined}
      >
        <AccordionItem value="reference" ref={formDivRef}>
          <AccordionContent>
            <Separator className="my-1" />
            <ReferenceForm
              form={useReferencesForm().form}
              loading={loading}
              handleFormSubmit={handleFormSubmit}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}

export default References;
