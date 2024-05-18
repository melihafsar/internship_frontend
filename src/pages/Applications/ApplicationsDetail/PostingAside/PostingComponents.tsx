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

interface PostingComponentsProps {
  postingId: number | undefined;
  userType: number | null;
  loading: boolean;
}

function PostingComponents({
  postingId,
  userType,
  loading,
}: PostingComponentsProps) {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [dialogOpen, setDialogOpen] = useState(false);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [window.innerWidth]);

  console.log("postingId", postingId);
  console.log("logic", loading || postingId === undefined || !(userType === 0));

  const triggerButton = (
    <Button
      onClick={() => {
        // applicationFormHandle.form.reset({
        //   internship_posting_id: postingId!,
        // });
      }}
      disabled={loading || postingId === undefined || !(userType === 0)}
      variant="default"
      className="w-[96%] m-2"
    >
      Stajı Değerlendir
    </Button>
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
                Stajını değerlendirmek için aşağıdaki alana mesaj
              </DialogDescription>
            </DialogHeader>
            <div className="h-full overflow-y-auto w-full">
              {/* Form datası gelecek */}
              {/* <InternshipApplicationForm
                form={applicationFormHandle.form}
                loading={loading}
                handleFormSubmit={applyToPosting}
              /> */}
            </div>
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
                  İlana Başvuru Formu
                </h1>
                <p className="text-sm text-center text-muted-foreground">
                  İlan başvurusu için aşağıdaki alandan öz geçmişinizi ekleyip
                  mesaj gönderebilirsiniz.
                </p>
              </div>
              <div className="h-full overflow-y-auto w-full mt-2">
                {/* Form datası gelecek */}
                {/* <InternshipApplicationForm
                  form={applicationFormHandle.form}
                  loading={loading}
                  handleFormSubmit={applyToPosting}
                /> */}
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
}

export default PostingComponents;
