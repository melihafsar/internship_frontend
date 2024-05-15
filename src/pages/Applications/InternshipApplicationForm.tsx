import { ImageUploadDialog } from "@/components/ImageUploadDialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { InternshipApplicationFormTypes } from "@/schemas/internship-application.schema";
import UploadService from "@/services/upload.service";
import { getError } from "@/utils/helpers.utils";
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

    const [uploadDialogProps, setUploadDialogProps] = useState<{ show: boolean }>({ show: false })
    const { toast } = useToast();

    const handleUploadImage = async (e: React.FormEvent<HTMLFormElement>, file: File) => {
        e.preventDefault();
        if (!file) {
            toast({
                title: "Lütfen bir resim dosyası seçin!",
                variant: "destructive",
            });
            return;
        }
        try {
            const result = await UploadService.uploadCv(file)
            form.setValue("cv", { file_name: file.name, cv_url: result.url })
            setUploadDialogProps({ show: false });
        }
        catch (error: any) {
            const errorDetails = getError(error);
            toast({
                title: errorDetails?.details ?? "Resim yüklenirken bir hata oluştu.",
                variant: "destructive",
            });
            return;
        }
    }

    return (
        <>
            <ImageUploadDialog
                show={uploadDialogProps.show}
                dialogClose={() => setUploadDialogProps({ ...uploadDialogProps, show: false })}
                handleFileUpload={handleUploadImage} />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleFormSubmit)}
                    className="mx-2 space-y-4"
                >

                    <div className="flex flex-col space-y-4 justify-between mt-8 items-left">
                        <FormField
                            control={form.control}
                            name="cv"
                            render={({ field }) => (
                                <FormItem className="top-[150px] left-[50px]">
                                    <FormControl>
                                        <Button type="button" onClick={() => setUploadDialogProps({ show: true })}>
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
                                <FormItem className="w-full h-[100px]">
                                    <FormLabel className="flex flex-row gap-x-2 items-baseline">
                                        Message
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea maxLength={2000} {...field} />
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
