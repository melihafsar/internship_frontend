import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useUtil } from "@/context/UtilContext";
import { Work } from "@/types";
import { WorkFormTypes, useWorkForm } from "@/schemas/work-form.schema";
import WorkForm from "./WorkForm";

interface WorkEditModalProps {
  triggerButton: React.ReactNode;
  handleUpdateWork: (data: WorkFormTypes, e: any) => Promise<void>;
  work: Work;
}

function WorkEditModal({
  triggerButton,
  handleUpdateWork,
  work,
}: WorkEditModalProps) {
  const { loading } = useUtil();

  return (
    <Dialog>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>İş Deneyimini Düzenle</DialogTitle>
          <DialogDescription>
            İş deneyiminizi düzenleyebilir ve güncelleyebilirsiniz.
          </DialogDescription>
        </DialogHeader>
        <div className="h-full overflow-y-auto w-full">
          <WorkForm
            form={useWorkForm().form}
            loading={loading}
            handleFormSubmit={handleUpdateWork}
            initialValues={work}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default WorkEditModal;
