import { useEffect, useState } from "react";
import InternshipApplicationForm from "../../InternshipApplicationForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useToast } from "@/components/ui/use-toast";
import InternshipService from "@/services/internship.service";
import {
  InternshipApplicationFormTypes,
  useInternshipApplicationForm,
} from "@/schemas/internship-application.schema";
import moment from "moment";

interface ApplyPostingComponentsProps {
  postingId: number | undefined;
  userType: number | null;
  isApplied?: boolean;
  deadLine: Date;
}

function ApplyPostingComponents({
  postingId,
  userType,
  isApplied,
  deadLine,
}: ApplyPostingComponentsProps) {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [loading, setLoading] = useState(false);
  const [isAppliedToPosting, setIsAppliedToPosting] = useState<boolean>(
    isApplied! || false
  );
  const { toast } = useToast();

  const applyToPosting = async (item: InternshipApplicationFormTypes) => {
    setLoading(true);
    try {
      await InternshipService.applyToPosting(item);
      setIsAppliedToPosting(true);
      setApplyPostingOpen(false);
    } catch {
      toast({
        title: "Hata",
        description: "İlan başvurusu yapılırken bir hata oluştu.",
      });
    }
    setLoading(false);
  };
  const [applyPostingOpen, setApplyPostingOpen] = useState(false);
  const applicationFormHandle = useInternshipApplicationForm();

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [window.innerWidth]);

  useEffect(() => {
    applicationFormHandle.form.reset({
      internship_posting_id: postingId!,
    });
    setIsAppliedToPosting(isApplied!);
  }, [postingId, isApplied]);

  const buttonDisabled =
    loading ||
    postingId === undefined ||
    moment(deadLine).isBefore(moment()) ||
    !(userType === 0) ||
    isAppliedToPosting;

  const triggerButton = (
    <Button
      onClick={() => {
        applicationFormHandle.form.reset({
          internship_posting_id: postingId!,
        });
      }}
      disabled={buttonDisabled}
      variant="default"
      className="w-[96%] m-2"
    >
      {isAppliedToPosting ? "İlana Başvuruldu" : "İlana Başvur"}
    </Button>
  );

  return (
    <>
      {windowWidth > 768 ? (
        <Dialog open={applyPostingOpen} onOpenChange={setApplyPostingOpen}>
          <DialogTrigger asChild disabled={buttonDisabled}>
            {triggerButton}
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>İlana Başvuru Formu</DialogTitle>
              <DialogDescription>
                İlan başvurusu için aşağıdaki alandan öz geçmişinizi ekleyip
                mesaj gönderebilirsiniz.
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
        </Dialog>
      ) : (
        <Drawer>
          <DrawerTrigger asChild disabled={buttonDisabled}>
            {triggerButton}
          </DrawerTrigger>
          <DrawerContent>
            <div className="w-full h-full flex flex-col gap-4 p-4">
              <div className="mx-auto w-full max-w-sm">
                <h1 className="text-lg font-semibold text-primary text-center">
                  İlana Başvuru Formu
                </h1>
                <p className="text-sm text-center text-muted-foreground">
                  İlan başvurusu için aşağıdaki alandan öz geçmişinizi ekleyip
                  mesaj gönderebilirsiniz.
                </p>
              </div>
              <div className="h-full overflow-y-auto w-full mt-2">
                <InternshipApplicationForm
                  form={applicationFormHandle.form}
                  loading={loading}
                  handleFormSubmit={applyToPosting}
                />
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
}

export default ApplyPostingComponents;
