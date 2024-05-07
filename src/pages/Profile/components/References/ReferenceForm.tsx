import { ReferencesFormTypes } from "@/schemas/references-form.schema";
import { Reference } from "@/types";
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
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ReferencaFormProps {
  form: UseFormReturn<ReferencesFormTypes>;
  loading: boolean;
  handleFormSubmit: (data: ReferencesFormTypes, e: any) => Promise<void>;
  initialValues?: Reference;
}

function ReferenceForm({
  form,
  loading,
  handleFormSubmit,
  initialValues,
}: ReferencaFormProps) {
  useEffect(() => {
    if (initialValues) form.reset(initialValues);
  }, []);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="mx-2 space-y-4"
      >
        <div className="flex flex-col md:flex-row space-y-4 md:space-x-4 md:space-y-0 justify-between mt-8 items-center">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full md:w-1/2 h-[80px]">
                <FormLabel className="flex flex-row gap-x-2 items-baseline">
                  Referans İsmi
                  <p className="text-[0.6rem] text-muted-foreground">
                    Bu alan zorunludur ve herkes görebilir.
                  </p>
                </FormLabel>
                <Input
                  {...field}
                  placeholder="Referans adını giriniz"
                  className="mt-1"
                />
                <FormMessage {...field} />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="surname"
            render={({ field }) => (
              <FormItem className="w-full md:w-1/2 h-[80px]">
                <FormLabel className="flex flex-row gap-x-2 items-baseline">
                  Referans Soyadı
                  <p className="text-[0.6rem] text-muted-foreground">
                    Bu alan zorunludur ve herkes görebilir.
                  </p>
                </FormLabel>
                <Input
                  {...field}
                  placeholder="Referans soyadını giriniz"
                  className="mt-1"
                />
                <FormMessage {...field} />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col md:flex-row space-y-4 md:space-x-4 md:space-y-0 justify-between mt-8 items-center">
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem className="w-full md:w-1/2 h-[80px]">
                <FormLabel className="flex flex-row gap-x-2 items-baseline">
                  Şirket Adı
                  <p className="text-[0.6rem] text-muted-foreground">
                    Bu alan zorunludur ve herkes görebilir.
                  </p>
                </FormLabel>
                <Input
                  {...field}
                  placeholder="Referansının çalıştığı şirket adını giriniz"
                  className="mt-1"
                />
                <FormMessage {...field} />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="duty"
            render={({ field }) => (
              <FormItem className="w-full md:w-1/2 h-[80px]">
                <FormLabel className="flex flex-row gap-x-2 items-baseline">
                  Görevinin Adı
                  <p className="text-[0.6rem] text-muted-foreground">
                    Bu alan zorunludur ve herkes görebilir.
                  </p>
                </FormLabel>
                <Input
                  {...field}
                  placeholder="Görev adını giriniz"
                  className="mt-1"
                />
                <FormMessage {...field} />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col md:flex-row space-y-4 md:space-x-4 md:space-y-0 justify-between mt-8 items-center">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full md:w-1/2 h-[80px]">
                <FormLabel className="flex flex-row gap-x-2 items-baseline">
                  E-posta Adresi
                  <p className="text-[0.6rem] text-muted-foreground">
                    Bu alan zorunludur ve herkes görebilir.
                  </p>
                </FormLabel>
                <Input
                  {...field}
                  placeholder="E-posta adresini giriniz"
                  className="mt-1"
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                />
                <FormMessage {...field} />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone_number"
            render={({ field }) => (
              <FormItem className="w-full md:w-1/2 h-[80px]">
                <FormLabel className="flex flex-row gap-x-2 items-baseline">
                  Telefon Numarası
                  <p className="text-[0.6rem] text-muted-foreground">
                    Bu alan zorunludur ve herkes görebilir.
                  </p>
                </FormLabel>
                <Input
                  {...field}
                  placeholder="Telefon numarasını giriniz"
                  className="mt-1"
                  pattern="[0-9]{10}"
                />
                <FormMessage {...field} />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex flex-row gap-x-2 items-baseline">
                Referans Açıklaması
                <p className="text-[0.6rem] text-muted-foreground">
                  Bu alan zorunludur ve herkes görebilir.
                </p>
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Referans açıklamasını giriniz"
                  className="h-32 w-full resize-none"
                />
              </FormControl>
              <FormMessage {...field} />
            </FormItem>
          )}
        />
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

export default ReferenceForm;
