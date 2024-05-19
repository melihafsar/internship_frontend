import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import PostingCard from "@/components/PostingCard";
import { Button } from "@/components/ui/button";
import InternshipPostingForm from "./InternshipPostingForm";
import {
  InternshipPostingFormTypes,
  useInternshipPostingForm,
} from "@/schemas/internship-posting.schema";
import { useState } from "react";
import CompanyService from "@/services/company.service";
import { useToast } from "@/components/ui/use-toast";
interface CompanyPostingCardProps {
  posting: InternshipPostingFormTypes;
  isReadonly?: boolean;
}

function CompanyPostingCard({ posting, isReadonly }: CompanyPostingCardProps) {
  const { form } = useInternshipPostingForm();
  const [loading, setLoading] = useState(false);
  const [updatePostingModalOpen, setUpdatePostingModalOpen] = useState(false);

  const { toast } = useToast();

  const deletePosting = async (item: InternshipPostingFormTypes) => {
    setLoading(true);
    try {
      await CompanyService.endPosting(item);
      toast({
        title: "Başarılı",
        description: "Staj ilanı başarıyla sonlandırıldı.",
        variant: "success",
      });
    } catch {
      toast({
        title: "Hata",
        description: "Şirket bilgileri getirilirken bir hata oluştu.",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  //updatePosting
  const handleFormSubmit = async (data: InternshipPostingFormTypes) => {
    setLoading(true);
    console.log(data);
    try {
      await CompanyService.updatePosting(data);
      toast({
        title: "Başarılı",
        description: "Staj ilan bilgileri başarıyla kaydedildi.",
        variant: "success",
      });
    } catch {
      toast({
        title: "Hata",
        description: "Şirket bilgileri getirilirken bir hata oluştu.",
        variant: "destructive",
      });
    }
    setLoading(false);
    setUpdatePostingModalOpen(false);
  };

  const accessFunctionality = () => {
    return (
      <div className="flex flex-row justify-between gap-2">
        <Dialog
          open={updatePostingModalOpen}
          onOpenChange={setUpdatePostingModalOpen}
        >
          <DialogTrigger asChild>
            <Button
              className="flex-1"
              onClick={() => form.reset({ ...posting })}
            >
              Düzenle
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Staj İlan Bilgileri</DialogTitle>
              <DialogDescription>
                Staj ilanınızın bilgilerini güncelleyebilirsiniz.
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
        <Button
          className="flex-1"
          disabled={new Date(posting.dead_line) < new Date()}
          onClick={() => deletePosting(posting)}
          variant={"destructive"}
        >
          Sonlandır
        </Button>
      </div>
    );
  };

  return <PostingCard posting={posting}>{!isReadonly && accessFunctionality()}</PostingCard>;
}

export default CompanyPostingCard;
