import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { useRef, useState } from "react";
import { Separator } from "@/components/ui/separator";
import {
  EducationFormTypes,
  useEducationForm,
} from "@/schemas/education-form.schema";
import { useUtil } from "@/context/UtilContext";
import { UserDetail } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import ProfileService from "@/services/profile.service";

import { ApiErrorData } from "@/types/error";
import { Badge } from "@/components/ui/badge";
import EducationCard from "./EducationCard";
import EducationForm from "./EducationForm";
import moment from "moment";
import { showAccordionInProfile } from "@/utils/helpers.utils";

interface EducationProps {
  user: UserDetail;
}

function Education({ user }: EducationProps) {
  const [showForm, setShowForm] = useState(false);
  const { loading, setLoading } = useUtil();
  const { toast } = useToast();
  const formDivRef = useRef<HTMLDivElement>(null);

  const handleFormSubmit = async (data: EducationFormTypes, e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const universityInfo = data.university_available
        ? { university_id: data.university_id }
        : { university_name: data.university_name };

      await ProfileService.addNewEducation({
        ...universityInfo,
        faculty: data.faculty,
        department: data.department,
        is_graduated: data.is_graduated,
        start_date: moment(data.start_date).format("YYYY-MM-DD"),
        end_date: data.is_graduated
          ? moment(data.end_date).format("YYYY-MM-DD")
          : null,
        education_year: data.is_graduated ? null : data.education_year,
        gpa: data.gpa,
        description: data.description,
      });
      toast({
        title: "Başarılı",
        description: "Yeni eğitim bilgileri başarıyla eklendi.",
        variant: "success",
      });
      setShowForm(false);
    } catch (error: { response: { data: { error: ApiErrorData } } } | any) {
      toast({
        title: "Hata",
        description: error.response.data.error.details,
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
          Eklediğim Eğitim Bilgilerim
          <Badge className="ml-2" variant="secondary">
            {user.university_educations?.length}
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
          Eğitim Bilgisi Ekleyin
        </Button>
      </div>
      <Separator className="my-1" />
      {user.university_educations?.length > 0 &&
        user.university_educations.map((education) => (
          <EducationCard key={education.id} education={education} />
        ))}
      <Accordion
        type="single"
        collapsible
        value={showForm ? "education" : undefined}
      >
        <AccordionItem value="education" ref={formDivRef}>
          <AccordionContent>
            <Separator className="my-1" />
            <EducationForm
              form={useEducationForm().form}
              loading={loading}
              handleFormSubmit={handleFormSubmit}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}

export default Education;
