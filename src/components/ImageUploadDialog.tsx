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
import { RotateCw } from "lucide-react";

interface ImageUploadDialogProps {
  show: boolean;
  dialogClose: () => void;
  handleFileUpload: (e: React.FormEvent<HTMLFormElement>, file: File) => void;
  title?: string;
  description?: string;
  loading?: boolean;
}

export const ImageUploadDialog = (props: ImageUploadDialogProps) => {
  const {
    show,
    dialogClose,
    handleFileUpload,
    title = "Resmi Yükle",
    description = "Resminizi yükleyerek profilinizin daha kişisel olmasını sağlayabilirsiniz.",
    loading,
  } = props;
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setUploadFile(file);
  };

  return (
    <Dialog open={show} onOpenChange={dialogClose} modal={true}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <form onSubmit={(e) => handleFileUpload(e, uploadFile!)}>
          <div className="grid gap-4 py-4">
            <div className="flex flex-row items-center gap-2">
              <Label htmlFor="name" className="text-[11px]">
                Seçilen Resim Dosyası
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
              {loading && <RotateCw className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? "Lütfen bekleyin..." : "Resmi Yükle"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
