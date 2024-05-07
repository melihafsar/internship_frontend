import ConfirmationDialog from "@/components/ConfirmationDialog";
import { Button } from "@/components/ui/button";
import { formatToLocaleDate } from "@/lib/utils";
import { Universityeducation } from "@/types";
import { Book, Edit, GraduationCap, Trash } from "lucide-react";
import ProfileService from "@/services/profile.service";
import { useToast } from "@/components/ui/use-toast";
import { useUtil } from "@/context/UtilContext";
import EducationEditModal from "./EducationEditModal";
import { EducationFormTypes } from "@/schemas/education-form.schema";
import moment from "moment";

interface EducationCardProps {
  education: Universityeducation;
}

function EducationCard({ education }: EducationCardProps) {
  const { toast } = useToast();
  const { setLoading } = useUtil();

  const deleteEducationById = async (id: number) => {
    try {
      setLoading(true);
      await ProfileService.deleteEducation(id);
      toast({
        title: "Eğitim bilgileriniz başarıyla silindi.",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: `Eğitim bilgileriniz silinirken bir hata oluştu. ${error}`,
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  const handleUpdateEducation = async (data: EducationFormTypes, e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const universityInfo = {
        ...data,
      };

      // @ts-ignore
      if (data.university_available) delete universityInfo.university_name;
      // @ts-ignore
      else delete universityInfo.university_id;
      // @ts-ignore
      delete universityInfo.university_available;

      await ProfileService.updateEducation(education.id!, {
        ...universityInfo,
        start_date: moment(data.start_date).format("YYYY-MM-DD"),
        end_date: data?.is_graduated
          ? moment(data.end_date).format("YYYY-MM-DD")
          : null,
        education_year: data.is_graduated ? null : data.education_year,
      });
      toast({
        title: "Eğitim bilgileriniz başarıyla güncellendi.",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: `Eğitim bilgileriniz güncellenirken bir hata oluştu. ${error}`,
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      key={education.id}
      className="flex flex-col my-8 hover:border-primary border-l-4 p-4"
    >
      <div className="flex flex-col md:flex-row justify-between items-center space-x-2">
        <p className="font-semibold"> ■ {education.university_name}</p>
        <div>
          <EducationEditModal
            education={education}
            triggerButton={
              <Button size="icon" variant="ghost">
                <Edit className="w-4 h-4" />
              </Button>
            }
            handleUpdateEducation={handleUpdateEducation}
          />
          <ConfirmationDialog
            onConfirm={() => deleteEducationById(education.id!)}
            triggerButton={
              <Button size="icon" variant="ghost">
                <Trash className="w-4 h-4 text-red-500" />
              </Button>
            }
            headerTitle="Eklediğim Eğitimi Sil"
            description="Eğitimi silmek istediğinize emin misiniz?"
          />
        </div>
      </div>
      <p className="font-light">
        {education.faculty} Fakültesi - {education.department}
      </p>
      <div className="flex flex-col md:flex-row justify-between items-center space-x-2 text-sm">
        <p className="text-muted-foreground">
          {formatToLocaleDate(education.start_date)} -{" "}
          {education.is_graduated
            ? formatToLocaleDate(education?.end_date!)
            : "Devam Ediyor"}
        </p>
        <div className="flex items-center space-x-2">
          <p className="text-muted-foreground">
            {education.is_graduated ? (
              <span className="flex text-green-500 items-center">
                <GraduationCap className="mx-1" />
                Mezun
              </span>
            ) : (
              <span className="flex text-orange-500 items-center">
                <Book className="mx-1" />
                Mezun değil
              </span>
            )}
          </p>
          <p className="text-muted-foreground">
            Not Ortalaması: {education.gpa}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <p className="text-muted-foreground">{education.description}</p>
      </div>
    </div>
  );
}

export default EducationCard;
