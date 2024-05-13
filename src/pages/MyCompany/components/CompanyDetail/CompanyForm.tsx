import { Button } from "@/components/ui/button";
import { Combobox, ComboboxData } from "@/components/ui/combobox";
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
import { CompanyFormTypes } from "@/schemas/company-form.schema";
import locationService from "@/services/location.service";
import { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";

interface CompanyFormProps {
  form: UseFormReturn<CompanyFormTypes>;
  loading: boolean;
  handleFormSubmit: (data: CompanyFormTypes) => void;
  initialValues?: CompanyFormTypes;
}

const CompanyForm = ({
  form,
  loading,
  handleFormSubmit,
  initialValues,
}: CompanyFormProps) => {
  const [countries, setCountries] = useState<ComboboxData>([]);
  const [cities, setCities] = useState<ComboboxData>([]);

  const fetchCountries = async () => {
    const result = await locationService.getCountries();
    const values = result.map((item) => {
      return { value: item.id.toString(), label: item.name };
    }) as ComboboxData;
    setCountries(values);
  };

  const fetchCities = async () => {
    setCities([]);
    const countryId = form.getValues("country_id");
    if (!countryId) return;
    const result = await locationService.getCities(countryId);
    const values = result.map((item) => {
      return { value: item.id.toString(), label: item.name };
    }) as ComboboxData;
    setCities(values);
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    fetchCities();
  }, [form.watch("country_id")]);

  useEffect(() => {
    if (initialValues) form.reset(initialValues);
  }, [form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="mx-2 space-y-4"
      >
        <div className="flex flex-col space-y-4 justify-between mt-8 items-center pb-[20px]">
          <div className="flex flex-col md:flex-row gap-2 items-center w-full">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full h-[100px]">
                  <FormLabel className="flex flex-row gap-x-2 items-baseline">
                    Şirket İsmi
                    <p className="text-[0.6rem] text-muted-foreground">
                      Bu alan zorunludur.
                    </p>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Şirketinizin ismi" />
                  </FormControl>
                  <FormMessage {...field} />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="short_description"
              render={({ field }) => (
                <FormItem className="w-full h-[100px]">
                  <FormLabel className="flex flex-row gap-x-2 items-baseline">
                    Kısa Açıklama
                    <p className="text-[0.6rem] text-muted-foreground">
                      Bu alan zorunludur.
                    </p>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Şirket hakkında kısa bilgi"
                    />
                  </FormControl>
                  <FormMessage {...field} />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-2 items-center w-full">
            <FormField
              control={form.control}
              name="website_url"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="flex flex-row gap-x-2 items-baseline">
                    Web Sitesi
                    <p className="text-[0.6rem] text-muted-foreground">
                      Bu alan zorunlu değildir.
                    </p>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="www.stajbuldum.net" />
                  </FormControl>
                  <FormMessage {...field} />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sector"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="flex flex-row gap-x-2 items-baseline">
                    Sektör
                    <p className="text-[0.6rem] text-muted-foreground">
                      Bu alan şirketinizin öne çıkmasını sağlar.
                    </p>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage {...field} />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-2 items-center w-full">
            <FormField
              control={form.control}
              name="number_of_workers"
              render={({ field }) => (
                <FormItem className="w-full md:w-1/2">
                  <FormLabel className="flex flex-row gap-x-2 items-baseline">
                    Çalışan Sayısı
                    <p className="text-[0.6rem] text-muted-foreground">
                      Sayfanızda örnek: 2000+ şeklinde gözükecektir.
                    </p>
                  </FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage {...field} />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-2 items-center w-full">
            <FormField
              control={form.control}
              name="country_id"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="flex flex-row gap-x-2 items-baseline">
                    Ülke
                    <p className="text-[0.6rem] text-muted-foreground">
                      Şirketinizin bulunduğu ülke
                    </p>
                  </FormLabel>
                  <FormControl className="w-full">
                    <Combobox
                      title="Ülkeler"
                      data={countries}
                      onSelect={(value) => field.onChange(parseInt(value))}
                      value={field.value?.toString()}
                    />
                  </FormControl>
                  <FormMessage {...field} />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city_id"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="flex flex-row gap-x-2 items-baseline">
                    Şehir
                    <p className="text-[0.6rem] text-muted-foreground">
                      Şirketinizin bulunduğu şehir
                    </p>
                  </FormLabel>
                  <FormControl className="w-full">
                    <Combobox
                      title="Şehirler"
                      data={cities}
                      onSelect={(value) => field.onChange(parseInt(value))}
                      value={field.value?.toString()}
                    />
                  </FormControl>
                  <FormMessage {...field} />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full h-[100px]">
                <FormLabel className="flex flex-row gap-x-2 items-baseline">
                  Açıklama
                  <p className="text-[0.6rem] text-muted-foreground">
                    Eklemek istediğiniz bilgileri buraya yazabilirsiniz.
                  </p>
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
  );
};

export default CompanyForm;
