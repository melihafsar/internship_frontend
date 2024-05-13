import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { showErrors } from "@/utils/helpers.utils";
import InternshipPostingForm from "./InternshipPostingForm";
import {
  InternshipPostingFormTypes,
  useInternshipPostingForm,
} from "@/schemas/internship-posting.schema";
import CompanyService from "@/services/company.service";
import { useToast } from "@/components/ui/use-toast";
import { useUtil } from "@/context/UtilContext";

interface CreatePostingModalProps {
  triggerButton: React.ReactNode;
}

function CreatePostingModal({ triggerButton }: CreatePostingModalProps) {
  const { form } = useInternshipPostingForm();
  const { loading, setLoading } = useUtil();
  const { toast } = useToast();

  const handleFormSubmit = async (data: InternshipPostingFormTypes) => {
    try {
      setLoading(true);
      await CompanyService.createPosting(data);
      toast({
        title: "Başarılı",
        description: "Staj ilanı başarıyla oluşturuldu.",
        variant: "success",
      });
    } catch (error: any) {
      showErrors(form, error);
      toast({
        title: "Hata",
        description: "Staj ilanı oluşturulurken bir hata oluştu.",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Yeni Staj İlanı Yayınla</DialogTitle>
          <DialogDescription>
            Lütfen şirketinizde staj ilanı yayınlamak için aşağıdaki formu
            doldurun.
          </DialogDescription>
        </DialogHeader>
        <div className="h-full overflow-y-auto w-full">
          <InternshipPostingForm
            loading={loading}
            form={form}
            handleFormSubmit={handleFormSubmit}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CreatePostingModal;
