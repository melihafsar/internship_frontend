import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useEffect, useState } from "react";
import CommentPostingForm from "./CommentPostingForm";
import {
  CommentPostingFormTypes,
  useCommentPostingForm,
} from "@/schemas/comment-posting-form.schema";
import { useToast } from "@/components/ui/use-toast";
import InternshipService from "@/services/internship.service";
import { Axios, AxiosError } from "axios";
import { ServiceResponse } from "@/types";

interface PostingComponentsProps {
  postingId: number | undefined;
  userType: number | null;
}

function PostingComponents({ postingId, userType }: PostingComponentsProps) {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const commentPostingFormHandle = useCommentPostingForm();
  const { toast } = useToast();

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [window.innerWidth]);

  const commentToInternship = async (item: CommentPostingFormTypes) => {
    setLoading(true);
    try {
      await InternshipService.commentPosting({
        internship_posting_id: item.internship_posting_id!,
        comment: item.comment!,
        points: item.points!,
      });
      setDialogOpen(false);
      toast({
        title: "Başarılı",
        description: "Staj değerlendirmeniz onay beklemektedir.",
      });
    } catch (error) {
      const axiosError = error as AxiosError<ServiceResponse>;
      toast({
        title: "Hata",
        description: `Staj değerlendirme işlemi sırasında bir hata oluştu. ${axiosError.response.data.error.details}`,
      });
    }
    setLoading(false);
    setDialogOpen(false);
  };

  const triggerButton = (
    <Button
      onClick={() => {
        commentPostingFormHandle.form.reset({
          internship_posting_id: postingId!,
        });
      }}
      disabled={loading || postingId === undefined || !(userType === 0)}
      variant="default"
      className="w-[96%] m-2"
    >
      Stajı Değerlendir
    </Button>
  );

  const formRender = (
    <CommentPostingForm
      form={commentPostingFormHandle.form}
      loading={loading}
      handleFormSubmit={commentToInternship}
    />
  );

  return (
    <>
      {windowWidth > 768 ? (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger
            asChild
            disabled={loading || postingId === undefined || !(userType === 0)}
          >
            {triggerButton}
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Stajını Değerlendir</DialogTitle>
              <DialogDescription>
                Stajını değerlendirmek için aşağıdaki alana mesaj yazabilir ve
                puanınızı gönderebilirsiniz.
              </DialogDescription>
            </DialogHeader>
            <div className="h-full overflow-y-auto w-full">{formRender}</div>
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer>
          <DrawerTrigger
            asChild
            disabled={loading || postingId === undefined || !(userType === 0)}
          >
            {triggerButton}
          </DrawerTrigger>
          <DrawerContent>
            <div className="w-full h-full flex flex-col gap-4 p-4">
              <div className="mx-auto w-full max-w-sm">
                <h1 className="text-lg font-semibold text-primary text-center">
                  Stajını Değerlendir
                </h1>
                <p className="text-sm text-center text-muted-foreground">
                  Stajını değerlendirmek için aşağıdaki alana mesaj yazabilir ve
                  puanınızı gönderebilirsiniz.
                </p>
              </div>
              <div
                className="h-full overflow-y-auto w-full mt-2"
                data-vaul-no-drag
              >
                {formRender}
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
}

export default PostingComponents;
