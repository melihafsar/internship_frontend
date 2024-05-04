import { Foreignlanguage } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useUtil } from "@/context/UtilContext";
import ForeignLanguagesForm from "./ForeignLanguagesForm";
import { useForeignLanguagesForm } from "@/schemas/foreign-languages-form.schema";

interface ForeignLanguageEditModalProps {
  foreignLanguage: Foreignlanguage;
  triggerButton: React.ReactNode;
  handleUpdateForeignLanguage: (data: {
    language_code: string;
    degree: string;
  }) => void;
}

function ForeignLanguageEditModal({
  foreignLanguage,
  triggerButton,
  handleUpdateForeignLanguage,
}: ForeignLanguageEditModalProps) {
  const { loading } = useUtil();

  return (
    <Dialog>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Yabancı Dil Bilgilerini Düzenle </DialogTitle>
          <DialogDescription>
            Yabancı Dil bilgilerinizi düzenleyebilir ve güncelleyebilirsiniz.
          </DialogDescription>
        </DialogHeader>
        <div className="h-full overflow-y-auto w-full">
          <ForeignLanguagesForm
            form={useForeignLanguagesForm().form}
            loading={loading}
            handleFormSubmit={(data: any) => handleUpdateForeignLanguage(data)}
            initialValues={foreignLanguage}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ForeignLanguageEditModal;
