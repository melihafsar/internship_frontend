import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CalendarIcon } from "lucide-react";
import { tr } from "date-fns/locale";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PrivateInformationFormTypes } from "@/schemas/private-information-schema";
import { UseFormReturn } from "react-hook-form";
import { Detail } from "@/types";
import {
  DriverLicencesClassArray,
  MaritalStatusTypesArray,
  MilitaryStatusArray,
  genderTypesArray,
} from "@/const";
import { MultiSelect } from "@/components/MultiSelect";
import { Combobox, ComboboxData } from "@/components/ui/combobox";
import LookupService from "@/services/lookup.service";

interface WorkFormProps {
  form: UseFormReturn<PrivateInformationFormTypes>;
  loading: boolean;
  handleFormSubmit: (
    data: PrivateInformationFormTypes,
    e: any
  ) => Promise<void>;
  initialValues?: Detail;
}

function PrivateInfoForm({
  form,
  loading,
  handleFormSubmit,
  initialValues,
}: WorkFormProps) {
  const [countryList, setCountryList] = useState<ComboboxData>([]);
  const [cityList, setCityList] = useState<ComboboxData>([]);
  const showCityField = form.getValues("country_id") !== (null || 0);
  const showOtherAddressField = form.getValues("city_id") !== (null || 0);

  const getCountryList = async () => {
    const response = await LookupService.getCountries();
    const coutryList = response.map(
      (item) => {
        return {
          value: item.id.toString(),
          label: item.name,
        };
      }
    );
    setCountryList(coutryList);
  };

  const getCitiesList = async (countryId: number) => {
    const response = await LookupService.getCities(countryId);
    const cityList = response.map(
      (item) => {
        return {
          value: item.id.toString(),
          label: item.name,
        };
      }
    );
    setCityList(cityList);
  };

  useEffect(() => {
    if (!countryList.length) getCountryList();
  }, []);

  useEffect(() => {
    if (form.getValues("country_id"))
      getCitiesList(Number(form.getValues("country_id")));
  }, [form.getValues("country_id")]);

  useEffect(() => {
    console.log("initialValues", initialValues);
    if (initialValues)
      form.reset({
        date_of_birth: initialValues.date_of_birth
          ? new Date(initialValues.date_of_birth)
          : new Date(new Date().setDate(new Date().getDate() - 1)),
        gender: initialValues.gender || "",
        driver_licenses: initialValues.driver_licenses || [],
        marital_status: initialValues.marital_status || "",
        military_status: initialValues.military_status || "",
        country_id: initialValues.country_id || 0,
        city_id: initialValues.city_id || 0,
        district: initialValues.district || "",
        address: initialValues.address || "",
      });
  }, [initialValues]);
  form.watch("country_id");

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="mx-2 space-y-4"
      >
        <div className="flex flex-col md:flex-row space-y-4 md:space-x-4 md:space-y-0 justify-between mt-8">
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="w-full md:w-1/2 h-[100px]">
                <FormLabel className="flex flex-row gap-x-2 items-baseline">
                  Cinsiyetiniz
                  <p className="text-[0.6rem] text-muted-foreground">
                    Bu alan zorunludur ve herkes görebilir.
                  </p>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={initialValues?.gender || field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Lütfen cinsiyet seçiniz" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {genderTypesArray.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage {...field} />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date_of_birth"
            render={({ field }) => (
              <FormItem className="w-full md:w-1/2">
                <FormLabel className="flex flex-row gap-x-2 items-baseline">
                  Başlangıç Tarihi
                  <p className="text-[0.6rem] text-muted-foreground">
                    Bu alan zorunludur ve herkes görebilir.
                  </p>
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value &&
                          format(new Date(field.value), "dd MMMM yyyy", {
                            locale: tr,
                          })}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage {...field} />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col md:flex-row space-y-4 md:space-x-4 md:space-y-0 justify-between mt-8">
          <FormField
            control={form.control}
            name="marital_status"
            render={({ field }) => (
              <FormItem className="w-full md:w-1/2 h-[100px]">
                <FormLabel className="flex flex-row gap-x-2 items-baseline">
                  Medeni Durumunuz
                  <p className="text-[0.6rem] text-muted-foreground">
                    Bu alan zorunludur ve herkes görebilir.
                  </p>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={initialValues?.marital_status || field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder="
                        Lütfen Medeni Durumunuzu Seçiniz"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {MaritalStatusTypesArray.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage {...field} />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="driver_licenses"
            render={({ field }) => (
              <FormItem className="w-full md:w-1/2 h-[100px]">
                <FormLabel className="flex flex-row gap-x-2 items-baseline">
                  Sürücü Belgesi
                  <p className="text-[0.6rem] text-muted-foreground">
                    Bu alan zorunludur ve herkes görebilir.
                  </p>
                </FormLabel>
                <MultiSelect
                  options={DriverLicencesClassArray}
                  selected={field.value}
                  {...field}
                  className="w-[560px]"
                />
                <FormMessage {...field} />
              </FormItem>
            )}
          />
        </div>
        {form.getValues("gender") === "Male" && (
          <div className="flex flex-col md:flex-row space-y-4 md:space-x-4 md:space-y-0 justify-between mt-8">
            <FormField
              control={form.control}
              name="military_status"
              render={({ field }) => (
                <FormItem className="w-full md:w-1/2 h-[100px]">
                  <FormLabel className="flex flex-row gap-x-2 items-baseline">
                    Askerlik Durumu
                    <p className="text-[0.6rem] text-muted-foreground">
                      Bu alan zorunlu değildir ve herkes görebilir.
                    </p>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={initialValues?.military_status || field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Lütfen Askerlik Durumunuzu Seçiniz" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {MilitaryStatusArray.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage {...field} />
                </FormItem>
              )}
            />
          </div>
        )}

        <div className="flex flex-col md:flex-row space-y-4 md:space-x-4 md:space-y-0 justify-between mt-8 items-center">
          <FormField
            control={form.control}
            name="country_id"
            render={({ field }) => (
              <FormItem className="w-full md:w-1/2 h-[100px]">
                <FormLabel className="flex flex-row gap-x-2 items-baseline">
                  Yaşadığınız Ülke
                  <p className="text-[0.6rem] text-muted-foreground">
                    Bu alan zorunlu değidir ve herkes görebilir.
                  </p>
                </FormLabel>
                <Combobox
                  {...field}
                  data={countryList}
                  title="Ülke Seçiniz"
                  onSelect={(value) => {
                    field.onChange(parseInt(value));
                  }}
                  className="w-full"
                  value={
                    initialValues?.country_id?.toString() ||
                    field.value?.toString()
                  }
                />
                <FormMessage {...field} />
              </FormItem>
            )}
          />
          {showCityField && (
            <FormField
              control={form.control}
              name="city_id"
              render={({ field }) => (
                <FormItem className="w-full md:w-1/2 h-[100px]">
                  <FormLabel className="flex flex-row gap-x-2 items-baseline">
                    Yaşadığınız Şehir
                    <p className="text-[0.6rem] text-muted-foreground">
                      Bu alan zorunlu değidir ve herkes görebilir.
                    </p>
                  </FormLabel>
                  <Combobox
                    {...field}
                    data={cityList}
                    title="Şehir Seçiniz"
                    onSelect={(value) => {
                      field.onChange(parseInt(value));
                    }}
                    className="w-full"
                    value={
                      initialValues?.city_id?.toString() ||
                      field.value?.toString()
                    }
                  />
                  <FormMessage {...field} />
                </FormItem>
              )}
            />
          )}
        </div>
        {showOtherAddressField && (
          <div className="flex flex-col md:flex-row space-y-4 md:space-x-4 md:space-y-0 justify-between mt-8 items-center">
            <FormField
              control={form.control}
              name="district"
              render={({ field }) => (
                <FormItem className="w-full md:w-1/2 h-[100px]">
                  <FormLabel className="flex flex-row gap-x-2 items-baseline">
                    İlçe
                    <p className="text-[0.6rem] text-muted-foreground">
                      Bu alan zorunlu değildir ve herkes görebilir.
                    </p>
                  </FormLabel>
                  <Input
                    {...field}
                    placeholder="İlçe bilgisi giriniz"
                    className="mt-1"
                  />
                  <FormMessage {...field} />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="w-full md:w-1/2 h-[100px]">
                  <FormLabel className="flex flex-row gap-x-2 items-baseline">
                    Adres
                    <p className="text-[0.6rem] text-muted-foreground">
                      Bu alan zorunlu değildir ve herkes görebilir.
                    </p>
                  </FormLabel>
                  <Input
                    {...field}
                    placeholder="Adress bilgisi giriniz"
                    className="mt-1"
                  />
                  <FormMessage {...field} />
                </FormItem>
              )}
            />
          </div>
        )}
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

export default PrivateInfoForm;
