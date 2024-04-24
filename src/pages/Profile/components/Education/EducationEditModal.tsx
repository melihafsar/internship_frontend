import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EducationForm from "./EducationForm";
import { useEducationForm } from "@/schemas/education-form.schema";
import { useUtil } from "@/context/UtilContext";
import { Universityeducation } from "@/types";

interface EducationEditModalProps {
  triggerButton: React.ReactNode;
  handleUpdateEducation: (data: any) => void;
  education: Universityeducation;
}

function EducationEditModal({
  triggerButton,
  handleUpdateEducation,
  education,
}: EducationEditModalProps) {
  const { loading } = useUtil();

  return (
    <Dialog>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Eğitim Bilgilerini Düzenle</DialogTitle>
          <DialogDescription>
            Eğitim bilgilerinizi düzenleyebilir ve güncelleyebilirsiniz.
          </DialogDescription>
        </DialogHeader>
        <div className="h-full overflow-y-auto w-full">
          <EducationForm
            form={useEducationForm().form}
            loading={loading}
            handleFormSubmit={(data: any) => handleUpdateEducation(data)}
            initialValues={education}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default EducationEditModal;
