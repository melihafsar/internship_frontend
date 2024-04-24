import { Combobox } from "@/components/ui/combobox";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
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
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import ProfileService from "@/services/profile.service";
import { useToast } from "@/components/ui/use-toast";
import { Universityeducation } from "@/types";

interface EducationFormProps {
  form: any;
  loading: boolean;
  handleFormSubmit: (data: any) => void;
  initialValues?: Universityeducation;
}

const EducationForm = ({
  form,
  loading,
  handleFormSubmit,
  initialValues,
}: EducationFormProps) => {
  const [isAvailableName, setIsAvailableName] = useState(false);
  const [universtiesList, setUniversitiesList] = useState([]);
  const { toast } = useToast();

  const fetchUniversities = async () => {
    try {
      const response = await ProfileService.getUniversities();
      const transformedData = response.data.map(
        (item: { id: number; name: string }) => ({
          value: item.id.toString(),
          label: item.name,
        })
      );
      setUniversitiesList(transformedData);
    } catch (error) {
      toast({
        variant: "destructive",
        title:
          "Üniversite listesi çekilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.",
      });
    }
  };

  useEffect(() => {
    fetchUniversities();
  }, []);

  useEffect(() => {
    if (initialValues)
      form.reset({
        ...initialValues,
        end_date: new Date(initialValues.end_date),
        start_date: new Date(initialValues.start_date),
      });
  }, [form]);

  return (
    <Form {...form}>
      <form
        onSubmit={(args) => form.handleSubmit(handleFormSubmit)(args)}
        className="mx-2 space-y-4"
      >
        <div className="flex items-center space-x-2 my-6">
          <Switch
            id="university-available"
            checked={isAvailableName}
            onCheckedChange={(value) => setIsAvailableName(value)}
          />
          <Label htmlFor="university-available" className="text-sm">
            Üniversitem Listede {isAvailableName ? "Var" : "Yok"}
          </Label>
        </div>
        <div className="flex flex-col md:flex-row space-y-4 md:space-x-4 md:space-y-0 justify-between mt-8 items-center">
          {isAvailableName ? (
            <FormField
              control={form.control}
              name="university_name"
              render={({ field }) => (
                <FormItem className="w-full md:w-1/2 h-[100px]">
                  <FormLabel className="flex flex-row gap-x-2 items-baseline">
                    Üniversiteniz
                    <p className="text-[0.6rem] text-muted-foreground">
                      Bu alan zorunludur ve herkes görebilir.
                    </p>
                  </FormLabel>
                  <Combobox
                    data={universtiesList}
                    title="Üniversite"
                    onSelect={(value) => {
                      field.onChange(value);
                    }}
                    className="w-full"
                  />
                  <FormMessage {...field} />
                </FormItem>
              )}
            />
          ) : (
            <FormField
              control={form.control}
              name="university_name"
              render={({ field }) => (
                <FormItem className="w-full md:w-1/2 h-[100px]">
                  <FormLabel className="flex flex-row gap-x-2 items-baseline">
                    Üniversiteniz
                    <p className="text-[0.6rem] text-muted-foreground">
                      Bu alan zorunludur ve herkes görebilir.
                    </p>
                  </FormLabel>
                  <Input
                    {...field}
                    placeholder="Üniversite Adını Giriniz"
                    className="mt-1"
                  />
                  <FormMessage {...field} />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="faculty"
            render={({ field }) => (
              <FormItem className="w-full md:w-1/2 h-[100px]">
                <FormLabel className="flex flex-row gap-x-2 items-baseline">
                  Fakülteniz
                  <p className="text-[0.6rem] text-muted-foreground">
                    Bu alan zorunludur ve herkes görebilir.
                  </p>
                </FormLabel>
                <Input {...field} placeholder="Fakülte" className="mt-1" />
                <FormMessage {...field} />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col md:flex-row space-y-4 md:space-x-4 md:space-y-0 justify-between mt-8">
          <FormField
            control={form.control}
            name="department"
            render={({ field }) => (
              <FormItem className="w-full md:w-1/2 h-[100px]">
                <FormLabel className="flex flex-row gap-x-2 items-baseline">
                  Bölümünüz
                  <p className="text-[0.6rem] text-muted-foreground">
                    Bu alan zorunludur ve herkes görebilir.
                  </p>
                </FormLabel>
                <Input {...field} placeholder="Bölüm" className="mt-1" />
                <FormMessage {...field} />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gpa"
            render={({ field }) => (
              <FormItem className="w-full md:w-1/2 h-[100px]">
                <FormLabel className="flex flex-row gap-x-2 items-baseline">
                  Not Ortalaması
                  <p className="text-[0.6rem] text-muted-foreground">
                    Bu alan zorunludur ve herkes görebilir.
                  </p>
                </FormLabel>
                <Input
                  type="number"
                  step="0.01"
                  {...field}
                  onChange={(e) => {
                    field.onChange(parseInt(e.target.value));
                  }}
                  value={field.value?.toString()}
                  min={0}
                  max={4}
                  placeholder="Not Ortalaması"
                  className="mt-1"
                />
                <FormMessage {...field} />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="is_graduated"
          render={({ field }) => (
            <FormItem className="w-full md:w-1/2">
              <FormLabel className="flex flex-row gap-x-2 items-center">
                <Switch
                  checked={field.value}
                  onCheckedChange={(value) => field.onChange(value)}
                  className="mt-1"
                />
                Mezun {field.value ? "oldum" : "olmadım"}
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
                  !form.getValues("is_graduated") && "hidden"
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

          <FormField
            control={form.control}
            name="education_year"
            render={({ field }) => (
              <FormItem
                className={cn(
                  "w-full md:w-1/2 h-[100px]",
                  form.getValues("is_graduated") && "hidden"
                )}
              >
                <FormLabel className="flex flex-row gap-x-2 items-baseline">
                  Geçirilen Eğitim Yılı
                  <p className="text-[0.6rem] text-muted-foreground">
                    Bu alan zorunludur ve herkes görebilir.
                  </p>
                </FormLabel>
                <Input
                  type="number"
                  pattern="[0-9]*"
                  min={0}
                  max={50}
                  {...field}
                  onChange={(e) => {
                    field.onChange(parseInt(e.target.value));
                  }}
                  value={field.value?.toString()}
                  placeholder="Kaçınıncı yılınız?"
                  className="mt-1"
                />
                <FormMessage {...field} />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col md:flex-row space-y-4 md:space-x-4 md:space-y-0 justify-between mt-8"></div>
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
                  placeholder="Üniversitenizle ilgili ek bilgileri yazabilirsiniz."
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

export default EducationForm;
