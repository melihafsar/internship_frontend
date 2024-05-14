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
import InternshipApplicationForm from "../../../Applications/InternshipApplicationForm";
import InternshipService from "@/services/internship.service";
import {
  InternshipApplicationFormTypes,
  useInternshipApplicationForm,
} from "@/schemas/internship-application.schema";
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
}

function CompanyPostingCard({ posting }: CompanyPostingCardProps) {
  const { form } = useInternshipPostingForm();
  // const applicationFormHandle = useInternshipApplicationForm();
  const [loading, setLoading] = useState(false);
  const [updatePostingModalOpen, setUpdatePostingModalOpen] = useState(false);
  // const [applyPostingOpen, setApplyPostingOpen] = useState(false);
  const { toast } = useToast();

  const deletePosting = async (item: InternshipPostingFormTypes) => {
    setLoading(true);
    try {
      await CompanyService.endPosting(item);
    } catch {
      toast({
        title: "Hata",
        description: "Şirket bilgileri getirilirken bir hata oluştu.",
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
    } catch {
      toast({
        title: "Hata",
        description: "Şirket bilgileri getirilirken bir hata oluştu.",
      });
    }
    setLoading(false);
    setUpdatePostingModalOpen(false);
  };

  // const applyToPosting = async (item: InternshipApplicationFormTypes) => {
  //   setLoading(true);
  //   try {
  //     await InternshipService.applyToPosting(item);
  //     setApplyPostingOpen(false);
  //   } catch {
  //     toast({
  //       title: "Hata",
  //       description: "Şirket bilgileri getirilirken bir hata oluştu.",
  //     });
  //   }
  //   setLoading(false);
  // };

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

  return <PostingCard posting={posting}>{accessFunctionality()}</PostingCard>;
}

export default CompanyPostingCard;
{
  /* <Dialog open={applyPostingOpen} onOpenChange={setApplyPostingOpen}>
        <DialogTrigger asChild>
          <Button
            onClick={() => {
              applicationFormHandle.form.reset({
                internship_posting_id: posting.id!,
              });
            }}
            variant={"outline"}
          >
            Apply
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Eğitim Bilgilerini Düzenle</DialogTitle>
            <DialogDescription>
              Eğitim bilgilerinizi düzenleyebilir ve güncelleyebilirsiniz.
            </DialogDescription>
          </DialogHeader>
          <div className="h-full overflow-y-auto w-full">
            <InternshipApplicationForm
              form={applicationFormHandle.form}
              loading={loading}
              handleFormSubmit={applyToPosting}
            />
          </div>
        </DialogContent>
      </Dialog> */
}
