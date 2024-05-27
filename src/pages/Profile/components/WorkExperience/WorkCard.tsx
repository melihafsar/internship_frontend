import { Work } from "@/types";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import { Button } from "@/components/ui/button";
import { formatToLocaleDate } from "@/lib/utils";
import { Edit, Trash } from "lucide-react";
import ProfileService from "@/services/profile.service";
import { useToast } from "@/components/ui/use-toast";
import { useUtil } from "@/context/UtilContext";
import moment from "moment";
import { WorkFormTypes } from "@/schemas/work-form.schema";
import WorkEditModal from "./WorkEditModal";
import { workTypesArray } from "@/const";
import { useIsReadonly } from "@/context/IsReadonlyContext";

interface WorkCardProps {
  work: Work;
}

function WorkCard({ work }: WorkCardProps) {
  const { toast } = useToast();
  const { setLoading } = useUtil();
  const isReadonly = useIsReadonly();

  const workDetails = [
    {
      title: "Görevler: ",
      content: work.duties,
    },
    {
      title: "Açıklama: ",
      content: work.description,
    },
    {
      title: "Ayrılma Nedeni: ",
      content: work.reason_for_leave,
    },
  ];

  const deleteWorkHistoryById = async (id: number) => {
    try {
      setLoading(true);
      await ProfileService.deleteExperience(id);
      toast({
        title: "İş deneyiminiz başarıyla silindi.",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: `İş deneyiminiz silinirken bir hata oluştu. ${error}`,
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  const handleUpdateWorkHistory = async (data: WorkFormTypes, e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      await ProfileService.updateExperience(work.id!, {
        company_name: data.company_name,
        position: data.position,
        start_date: moment(data.start_date).format("YYYY-MM-DD"),
        end_date: data.is_working_now
          ? undefined
          : moment(data.end_date).format("YYYY-MM-DD"),
        is_working_now: data.is_working_now,
        description: data.description,
        duties: data.duties,
        work_type: data.work_type,
        reason_for_leave: data.is_working_now ? "" : data.reason_for_leave,
      });
      toast({
        title: "İş deneyiminiz başarıyla güncellendi.",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: `İş deneyiminiz güncellenirken bir hata oluştu. ${error}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      key={work.id}
      className="flex flex-col my-8 hover:border-primary border-l-4 p-4"
    >
      <div className="flex flex-col md:flex-row justify-between items-center space-x-2">
        <p className="font-semibold"> ■ {work.company_name}</p>
        <div>
          {!isReadonly && (<><WorkEditModal
            work={work}
            triggerButton={
              <Button size="icon" variant="ghost">
                <Edit className="w-4 h-4" />
              </Button>
            }
            handleUpdateWork={handleUpdateWorkHistory}
          />
            <ConfirmationDialog
              onConfirm={() => deleteWorkHistoryById(work.id!)}
              triggerButton={
                <Button size="icon" variant="ghost">
                  <Trash className="w-4 h-4 text-red-500" />
                </Button>
              }
              headerTitle="Eklediğim Çalışma Deneyimini Sil"
              description="Çalışma deneyiminizi silmek istediğinize emin misiniz?"
            /></>)}
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center space-x-2">
        <p className="font-light">
          {`${work.position} - ${workTypesArray.find((type) => type.value === work.work_type)?.label
            }`}
        </p>
        <p className="text-muted-foreground text-sm">
          {formatToLocaleDate(work.start_date)} -{" "}
          {work.is_working_now
            ? "Devam Ediyor"
            : formatToLocaleDate(work.end_date!)}
        </p>
      </div>
      <div className="flex flex-col mt-2">
        {workDetails.map(
          (detail, index) =>
            detail.content && (
              <p key={index} className="text-muted-foreground">
                <span className="text-primary">{detail.title}</span>
                {detail.content}
              </p>
            )
        )}
      </div>
    </div>
  );
}

export default WorkCard;
