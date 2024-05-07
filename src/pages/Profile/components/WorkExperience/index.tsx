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
import WorkForm from "./WorkForm";
import WorkCard from "./WorkCard";
import ProfileService from "@/services/profile.service";
import { WorkFormTypes, useWorkForm } from "@/schemas/work-form.schema";
import moment from "moment";
import { showAccordionInProfile } from "@/utils/helpers.utils";

interface WorkExperienceProps {
  user: UserDetail;
}

function WorkExperience({ user }: WorkExperienceProps) {
  const [showForm, setShowForm] = useState(false);
  const { loading, setLoading } = useUtil();
  const { toast } = useToast();
  const formDivRef = useRef<HTMLDivElement>(null);

  const handleFormSubmit = async (data: WorkFormTypes, e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      await ProfileService.addNewExperience({
        ...data,
        start_date: moment(data.start_date).format("YYYY-MM-DD"),
        end_date: data.is_working_now
          ? undefined
          : moment(data.end_date).format("YYYY-MM-DD"),
        reason_for_leave: data.is_working_now
          ? undefined
          : data.reason_for_leave,
      });
      toast({
        title: "Başarılı",
        description: "Yeni iş deneyimi başarıyla eklendi.",
        variant: "success",
      });
      setShowForm(false);
    } catch (error) {
      toast({
        title: "Hata",
        description: "İş deneyimi eklenirken bir hata oluştu.",
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
          Eklediğim İş Deneyimlerim
          <Badge className="ml-2" variant="secondary">
            {user.works?.length}
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
          İş Deneyimi Ekleyin
        </Button>
      </div>
      {user.works?.length > 0 && (
        <>
          <Separator className="my-1" />
          {user.works.map((work) => (
            <WorkCard key={work.id} work={work} />
          ))}
        </>
      )}
      <Accordion
        type="single"
        collapsible
        value={showForm ? "experience" : undefined}
      >
        <AccordionItem value="experience" ref={formDivRef}>
          <AccordionContent>
            <Separator className="my-1" />
            <WorkForm
              form={useWorkForm().form}
              loading={loading}
              handleFormSubmit={handleFormSubmit}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}

export default WorkExperience;
