import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
// import InternshipApplicationForm from "../../../Applications/InternshipApplicationForm";
// import InternshipService from "@/services/internship.service";
// import {
//   InternshipApplicationFormTypes,
//   useInternshipApplicationForm,
// } from "@/schemas/internship-application.schema";
import {
  InternshipPostingFormTypes,
  // useInternshipPostingForm,
} from "@/schemas/internship-posting.schema";
// import { useState } from "react";
// import CompanyService from "@/services/company.service";
// import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Link } from "lucide-react";

interface CompanyPostingCardProps {
  posting: InternshipPostingFormTypes;
}

function CompanyPostingCard({ posting }: CompanyPostingCardProps) {
  // const { form } = useInternshipPostingForm();
  // const applicationFormHandle = useInternshipApplicationForm();
  // const [loading, setLoading] = useState(false);
  // const [applyPostingOpen, setApplyPostingOpen] = useState(false);
  // const { toast } = useToast();

  // const deletePosting = async (item: InternshipPostingFormTypes) => {
  //   setLoading(true);
  //   try {
  //     await CompanyService.endPosting(item);
  //   } catch {
  //     toast({
  //       title: "Hata",
  //       description: "Şirket bilgileri getirilirken bir hata oluştu.",
  //     });
  //   }
  //   setLoading(false);
  // };

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

  const navigate = useNavigate();

  return (
    <Card className="w-[500px] p-5 select-none">
      <CardHeader className="p-0">
        <img className="mb-3" src={posting.image_url} />
        <CardTitle>{posting.title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0 my-2">
        <p className="text-sm text-gray-500 line-clamp-3">
          {posting.description}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between pl-0 pt-0">
        <Button
          variant={"link"}
          onClick={() => navigate(`/internships/${posting.id}`)}
        >
          <Link className="mr-1" size={14} />
          Daha Fazla Bilgi
        </Button>
      </CardFooter>

      {/* <Button onClick={() => form.reset({ ...posting })}>Düzenle</Button>
        <Button onClick={() => deletePosting(posting)} variant={"destructive"}>
          Sonlandır
        </Button> */}
      {/* <Dialog open={applyPostingOpen} onOpenChange={setApplyPostingOpen}>
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
      </Dialog> */}
    </Card>
  );
}

export default CompanyPostingCard;
