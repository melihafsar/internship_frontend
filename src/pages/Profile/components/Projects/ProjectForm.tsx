import { ProjectFormTypes } from "@/schemas/project-form.schema";
import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface ProjectFormProps {
  form: UseFormReturn<ProjectFormTypes>;
  loading: boolean;
  handleFormSubmit: (data: ProjectFormTypes, e: any) => Promise<void>;
  initialValues?: ProjectFormTypes;
}

function ProjectForm({
  form,
  loading,
  handleFormSubmit,
  initialValues,
}: ProjectFormProps) {
  useEffect(() => {
    if (initialValues) form.reset(initialValues);
  }, [initialValues]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="mx-2 space-y-4"
      >
        <div className="flex flex-col md:flex-row space-y-4 md:space-x-4 md:space-y-0 justify-between mt-8 items-center">
          <FormField
            control={form.control}
            name="project_name"
            render={({ field }) => (
              <FormItem className="w-full md:w-1/2 h-[100px]">
                <FormLabel className="flex flex-row gap-x-2 items-baseline">
                  Proje Adı
                  <p className="text-[0.6rem] text-muted-foreground">
                    Bu alan zorunludur ve herkes görebilir.
                  </p>
                </FormLabel>
                <Input
                  {...field}
                  placeholder="Projenizin adını girin"
                  className="mt-1"
                />
                <FormMessage {...field} />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="project_link"
            render={({ field }) => (
              <FormItem className="w-full md:w-1/2 h-[100px]">
                <FormLabel className="flex flex-row gap-x-2 items-baseline">
                  Proje URL
                  <p className="text-[0.6rem] text-muted-foreground">
                    Bu alan zorunludur ve herkes görebilir.
                  </p>
                </FormLabel>
                <Input
                  {...field}
                  placeholder="Projenizin URL'sini girin"
                  className="mt-1"
                />
                <FormMessage {...field} />
              </FormItem>
            )}
          />
        </div>
        <div className="pb-14">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full h-[110px]">
                <FormLabel className="flex flex-row gap-x-2 items-baseline">
                  Açıklama
                  <p className="text-[0.6rem] text-muted-foreground">
                    Bu alan zorunlu değildir ve herkes görebilir.
                  </p>
                </FormLabel>
                <Textarea
                  {...field}
                  className="h-32 w-full resize-none"
                  placeholder="Proje ile ilgili tüm detayları buraya yazabilirsiniz."
                />
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
  );
}

export default ProjectForm;
