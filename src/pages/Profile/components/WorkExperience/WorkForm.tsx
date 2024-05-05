import { Switch } from "@/components/ui/switch";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Textarea } from "@/components/ui/textarea";
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
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";
import { WorkFormTypes } from "@/schemas/work-form.schema";
import { Work } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { workTypesArray } from "@/const";

interface WorkFormProps {
  form: UseFormReturn<WorkFormTypes>;
  loading: boolean;
  handleFormSubmit: (data: WorkFormTypes, e: any) => Promise<void>;
  initialValues?: Work;
}

function WorkForm({
  form,
  loading,
  handleFormSubmit,
  initialValues,
}: WorkFormProps) {
  useEffect(() => {
    if (initialValues)
      form.reset({
        ...initialValues,
        start_date: new Date(initialValues.start_date),
        end_date: new Date(initialValues.end_date),
      });
  }, [form, initialValues]);

  form.watch("is_working_now");
  form.watch("start_date");

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="mx-2 space-y-4"
      >
        <div className="flex flex-col md:flex-row space-y-4 md:space-x-4 md:space-y-0 justify-between mt-8 items-center">
          <FormField
            control={form.control}
            name="company_name"
            render={({ field }) => (
              <FormItem className="w-full md:w-1/2 h-[100px]">
                <FormLabel className="flex flex-row gap-x-2 items-baseline">
                  Şirket Adı
                  <p className="text-[0.6rem] text-muted-foreground">
                    Bu alan zorunludur ve herkes görebilir.
                  </p>
                </FormLabel>
                <Input
                  {...field}
                  placeholder="Şirket adını giriniz"
                  className="mt-1"
                />
                <FormMessage {...field} />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem className="w-full md:w-1/2 h-[100px]">
                <FormLabel className="flex flex-row gap-x-2 items-baseline">
                  Pozisyon
                  <p className="text-[0.6rem] text-muted-foreground">
                    Bu alan zorunludur ve herkes görebilir.
                  </p>
                </FormLabel>
                <Input
                  {...field}
                  placeholder="Senior Yazılım Geliştirici"
                  className="mt-1"
                />
                <FormMessage {...field} />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="is_working_now"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="flex flex-row gap-x-2 items-center">
                <Switch
                  checked={field.value}
                  onCheckedChange={(value) => field.onChange(value)}
                  className="mt-1"
                />
                Şu anda {field.value ? "çalışıyorum" : "çalışmıyorum"}
                <p className="text-[0.6rem] text-muted-foreground">
                  Bu alan zorunludur ve herkes görebilir.
                </p>
              </FormLabel>
              <FormMessage {...field} />
            </FormItem>
          )}
        />
        <div className="flex flex-col md:flex-row space-y-4 md:space-x-4 md:space-y-0 justify-between mt-8">
          <FormField
            control={form.control}
            name="start_date"
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

          <FormField
            control={form.control}
            name="end_date"
            render={({ field }) => (
              <FormItem
                className={cn(
                  `w-full md:w-1/2`,
                  form.getValues("is_working_now") && "hidden"
                )}
              >
                <FormLabel className="flex flex-row gap-x-2 items-baseline">
                  Bitiş Tarihi
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
                        date < new Date("1900-01-01") ||
                        date <= form.getValues("start_date")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage {...field} />
              </FormItem>
            )}
          />
          <div
            className={cn(
              "w-full md:w-1/2 h-[100px]",
              !form.getValues("is_working_now") && "hidden"
            )}
          >
            <FormLabel className="flex flex-row gap-x-2 items-baseline pb-1">
              Geçirilen Çalışma Yılı
              <p className="text-[0.6rem] text-muted-foreground">
                Bu alanı herkes görebilir.
              </p>
            </FormLabel>
            <Input
              disabled
              value={
                Math.floor(
                  new Date().getFullYear() -
                    new Date(form.getValues("start_date")).getFullYear()
                ) + " yıl"
              }
              className="mt-1"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row space-y-4 md:space-x-4 md:space-y-0 justify-between mt-8 items-center">
          <FormField
            control={form.control}
            name="work_type"
            render={({ field }) => (
              <FormItem className="w-full md:w-1/2 h-[100px]">
                <FormLabel className="flex flex-row gap-x-2 items-baseline">
                  İş Çalışma Türü
                  <p className="text-[0.6rem] text-muted-foreground">
                    Bu alan zorunludur ve herkes görebilir.
                  </p>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="İş Çalışma Türü Seçiniz" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {workTypesArray.map((type) => (
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
            name="duties"
            render={({ field }) => (
              <FormItem className="w-full md:w-1/2 h-[100px]">
                <FormLabel className="flex flex-row gap-x-2 items-baseline">
                  Şirketteki Görevleriniz
                  <p className="text-[0.6rem] text-muted-foreground">
                    Bu alan zorunludur ve herkes görebilir.
                  </p>
                </FormLabel>
                <Input
                  {...field}
                  placeholder="Takım liderliği, yazılım geliştirme vb."
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
              <FormItem className="w-full h-[100px]">
                <FormLabel className="flex flex-row gap-x-2 items-baseline">
                  Açıklama
                  <p className="text-[0.6rem] text-muted-foreground">
                    Bu alan zorunlu değildir ve herkes görebilir.
                  </p>
                </FormLabel>
                <Textarea
                  {...field}
                  className="h-32 w-full resize-none"
                  placeholder="İşinizle ilgili ek bilgileri yazabilirsiniz."
                />
                <FormMessage {...field} />
              </FormItem>
            )}
          />
        </div>
        {!form.getValues("is_working_now") && (
          <div className="pb-14">
            <FormField
              control={form.control}
              name="reason_for_leave"
              render={({ field }) => (
                <FormItem className="w-full h-[110px]">
                  <FormLabel className="flex flex-row gap-x-2 items-baseline">
                    İşten Ayrılma Nedeni
                    <p className="text-[0.6rem] text-muted-foreground">
                      Bu alan zorunlu değildir ve herkes görebilir.
                    </p>
                  </FormLabel>
                  <Textarea
                    {...field}
                    value={field.value ? field.value : ""}
                    className="h-32 w-full resize-none"
                    placeholder="İşten ayrılma nedeninizi yazabilirsiniz."
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

export default WorkForm;
