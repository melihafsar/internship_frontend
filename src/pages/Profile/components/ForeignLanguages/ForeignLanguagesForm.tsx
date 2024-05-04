import { Foreignlanguage } from "@/types";
import { useEffect } from "react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Languages, LanguageDegree } from "@/const/languages";
import { Combobox } from "@/components/ui/combobox";
import { Button } from "@/components/ui/button";

interface ForeignLanguagesFormProps {
  form: any;
  loading: boolean;
  handleFormSubmit: (data: any) => void;
  initialValues?: Foreignlanguage;
}

const ForeignLanguagesForm = ({
  form,
  loading,
  handleFormSubmit,
  initialValues,
}: ForeignLanguagesFormProps) => {
  useEffect(() => {
    if (initialValues) form.reset(initialValues);
  }, [form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="mx-2 space-y-4"
      >
        <div className="flex flex-col md:flex-row space-y-4 md:space-x-4 md:space-y-0 justify-between mt-8 items-center">
          <FormField
            control={form.control}
            name="language_code"
            render={({ field }) => (
              <FormItem className="w-full md:w-1/2 h-[100px]">
                <FormLabel className="flex flex-row gap-x-2 items-baseline">
                  Yabancı Dil
                  <p className="text-[0.6rem] text-muted-foreground">
                    Bu alan zorunludur ve herkes görebilir.
                  </p>
                </FormLabel>
                <Combobox
                  data={Languages}
                  title="Yabancı dil seçiniz"
                  onSelect={(value) => {
                    field.onChange(value);
                  }}
                  className="w-full"
                />
                <FormMessage {...field} />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="degree"
            render={({ field }) => (
              <FormItem className="w-full md:w-1/2 h-[100px]">
                <FormLabel className="flex flex-row gap-x-2 items-baseline">
                  Yabancı Dil Derecesi
                  <p className="text-[0.6rem] text-muted-foreground">
                    Bu alan zorunludur ve herkes görebilir.
                  </p>
                </FormLabel>
                <Combobox
                  data={LanguageDegree}
                  title="Yabancı dil derecesi seçiniz"
                  onSelect={(value) => {
                    field.onChange(value);
                  }}
                  className="w-full"
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
};

export default ForeignLanguagesForm;
