import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import profileService from "../../../../services/profile.service";
import { useToast } from "@/components/ui/use-toast";

interface PhotoUploadDialogProps {
  show: boolean;
  dialogClose: () => void;
}

export const PhotoUploadDialog = (props: PhotoUploadDialogProps) => {
  const { show, dialogClose } = props;
  const [uploadFile, setUploadFile] = useState();
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadFile(e.target.files[0]);
  };

  const handleFileUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!uploadFile) {
      console.error("No file selected.");
      return;
    }

    const formData = new FormData();
    formData.append("file", uploadFile);

    try {
      await profileService.updateProfileImage(formData);
      toast({
        title: "Profil resmi başarıyla yüklendi.",
        variant: "success",
      });
      window.location.reload();
    } catch (error) {
      toast({
        title: `Profil resmi yüklenirken bir hata oluştu. ${error}`,
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={show} onOpenChange={dialogClose} modal={true}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Profil Resmi Yükle</DialogTitle>
          <DialogDescription>
            Profil resminizi yükleyerek profilinizin daha kişisel olmasını
            sağlayabilirsiniz.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={(e) => handleFileUpload(e)}>
          <div className="grid gap-4 py-4">
            <div className="flex flex-row items-center gap-2">
              <Label htmlFor="name" className="text-right">
                Fotoğraf
              </Label>
              <Input type="file" onChange={(e) => handleFileChange(e)} />
            </div>
          </div>
          <DialogFooter className="sm:justify-start">
            <Button
              type="submit"
              size="sm"
              className="w-full"
              variant="default"
            >
              Fotoğrafı Yükle
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
