import { ImageUploadDialog } from "@/components/ImageUploadDialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { InternshipApplicationFormTypes } from "@/schemas/internship-application.schema";
import UploadService from "@/services/upload.service";
import { getError } from "@/utils/helpers.utils";
import { RotateCw } from "lucide-react";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";

interface InternshipApplicationFormProps {
  form: UseFormReturn<InternshipApplicationFormTypes>;
  loading: boolean;
  handleFormSubmit: (data: InternshipApplicationFormTypes) => void;
}

const InternshipApplicationForm = ({
  form,
  loading,
  handleFormSubmit,
}: InternshipApplicationFormProps) => {
  const [uploadDialogProps, setUploadDialogProps] = useState<{ show: boolean }>(
    { show: false }
  );
  const { toast } = useToast();

  const handleUploadImage = async (
    e: React.FormEvent<HTMLFormElement>,
    file: File
  ) => {
    e.preventDefault();
    if (!file) {
      toast({
        title: "Lütfen bir dosya seçiniz.",
        variant: "destructive",
      });
      return;
    }
    try {
      const result = await UploadService.uploadCv(file);
      form.setValue("cv", { file_name: file.name, cv_url: result.url });
      setUploadDialogProps({ show: false });
    } catch (error: any) {
      const errorDetails = getError(error);
      toast({
        title: errorDetails?.details ?? "Dosya yüklenirken bir hata oluştu.",
        variant: "destructive",
      });
      return;
    }
  };

  return (
    <>
      <ImageUploadDialog
        show={uploadDialogProps.show}
        dialogClose={() =>
          setUploadDialogProps({ ...uploadDialogProps, show: false })
        }
        handleFileUpload={handleUploadImage}
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className="space-y-2"
        >
          <div className="flex flex-col space-y-4 justify-between items-left">
            <FormField
              control={form.control}
              name="cv"
              render={({ field }) => (
                <FormItem className="top-[150px] left-[50px]">
                  <FormControl>
                    <Button
                      type="button"
                      onClick={() => setUploadDialogProps({ show: true })}
                      disabled={loading}
                    >
                      {loading && (
                        <RotateCw className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      {field.value?.file_name ?? "CV Yükle"}
                    </Button>
                  </FormControl>
                  <FormMessage {...field} />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="w-full h-[130px] p-1">
                  <FormLabel className="flex flex-row gap-x-2 items-baseline">
                    Mesajınız
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      maxLength={1000}
                      className="w-full h-[82px] p-1 resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage {...field} />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            variant="secondary"
            size="sm"
            className="w-full mb-2"
            disabled={loading}
          >
            Bilgilerimi Kaydet
          </Button>
        </form>
      </Form>
    </>
  );
};

export default InternshipApplicationForm;
