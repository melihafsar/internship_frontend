import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useUtil } from "@/context/UtilContext";
import { Reference } from "@/types";
import {
  ReferencesFormTypes,
  useReferencesForm,
} from "@/schemas/references-form.schema";
import ReferenceForm from "./ReferenceForm";

interface ReferencaFormProps {
  triggerButton: React.ReactNode;
  handleUpdateReference: (data: ReferencesFormTypes, e: any) => Promise<void>;
  reference: Reference;
}

function ReferenceEditModal({
  triggerButton,
  handleUpdateReference,
  reference,
}: ReferencaFormProps) {
  const { loading } = useUtil();

  return (
    <Dialog>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Referans Bilgilerini Düzenle</DialogTitle>
          <DialogDescription>
            Referans Bilgilerini düzenleyebilir ve güncelleyebilirsiniz.
          </DialogDescription>
        </DialogHeader>
        <div className="h-full overflow-y-auto w-full">
          <ReferenceForm
            form={useReferencesForm().form}
            loading={loading}
            handleFormSubmit={handleUpdateReference}
            initialValues={reference}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ReferenceEditModal;
