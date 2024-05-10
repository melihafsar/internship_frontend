import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Combobox, ComboboxData } from "@/components/ui/combobox";
import { TimePickerDemo } from "@/components/ui/date-time-picker/time-picker-demo";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { EmploymentTypeArray, workTypesArray } from "@/const";
import { cn } from "@/lib/utils";
import { ImageUploadDialog } from "@/pages/Profile/components/ContactDetails/ImageUploadDialog";
import { InternshipPostingFormTypes } from "@/schemas/internship-posting.schema";
import locationService from "@/services/location.service";
import uploadService from "@/services/upload.service";
import { format } from "date-fns";
import { CalendarIcon, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { FieldPath, UseFormReturn } from "react-hook-form";


const EditIcon = () => {
    return (
        <div className="absolute bg-background p-2 rounded-full top-2 right-2 opacity-0 group-hover:opacity-100 z-50">
            <Pencil />
        </div>
    )
}


interface InternshipPostingFormProps {
    form: UseFormReturn<InternshipPostingFormTypes>;
    loading: boolean;
    handleFormSubmit: (data: InternshipPostingFormTypes) => void;
    initialValues?: InternshipPostingFormTypes;
}

const InternshipPostingForm = ({
    form,
    loading,
    handleFormSubmit,
    initialValues,
}: InternshipPostingFormProps) => {
    const [countries, setCountries] = useState<ComboboxData>([]);
    const [cities, setCities] = useState<ComboboxData>([]);
    const [uploadDialogProps, setUploadDialogProps] = useState<{ show: boolean, field?: FieldPath<InternshipPostingFormTypes> }>({ show: false, field: undefined })
    const { toast } = useToast();

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

    const handleUploadImage = async (e: React.FormEvent<HTMLFormElement>, file: File) => {
        e.preventDefault();
        if (!file) {
            toast({
                title: "Lütfen bir resim dosyası seçin!",
                variant: "destructive",
            });
            return;
        }

       
        const result = await uploadService.uploadImage(file, "Image")
        if (!result || uploadDialogProps.field === undefined) {
            toast({
                title: "Resim yüklenirken bir hata oluştu.",
                variant: "destructive",
            });
            return;
        }

        form.setValue(uploadDialogProps.field, result.url);
        setUploadDialogProps({ show: false });
    }

    useEffect(() => {
        fetchCountries();
    }, [])

    useEffect(() => {
        fetchCities();
    }, [form.watch("country_id")])


    useEffect(() => {
        if (initialValues) form.reset(initialValues);
    }, [form]);

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleFormSubmit)}
                className="mx-2 space-y-4"
            >
                <ImageUploadDialog
                    show={uploadDialogProps.show}
                    dialogClose={() => setUploadDialogProps({ ...uploadDialogProps, show: false })}
                    handleFileUpload={handleUploadImage} />
                <div className="w-full relative space-y-4 pb-[125px]">
                    <FormField
                        control={form.control}
                        name="image_url"
                        render={({ field }) => (
                            <FormItem className="w-max">
                                <FormLabel className="flex flex-row gap-x-2 items-baseline">
                                    Logo
                                </FormLabel>
                                <FormControl>
                                    <div className="relative flex items-center group cursor-pointer"
                                        onClick={() => setUploadDialogProps({ show: true, field: field.name })}>
                                        <EditIcon />
                                        <img className="rounded-md object-cover bg-gray-100 w-[256px]" src={field.value ?? "./no-image.svg"} />
                                    </div>
                                </FormControl>
                                <FormMessage {...field} />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex flex-row gap-x-2 items-baseline">
                                    Başlık
                                    <p className="text-[0.6rem] text-muted-foreground">
                                        Bu alan zorunludur ve herkes görebilir.
                                    </p>
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage {...field} />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem className="w-full min-h-[100px]">
                                <FormLabel className="flex flex-row gap-x-2 items-baseline">
                                    Açıklama
                                    <p className="text-[0.6rem] text-muted-foreground">
                                        Bu alan zorunludur ve herkes görebilir.
                                    </p>
                                </FormLabel>
                                <FormControl>
                                    <Textarea maxLength={2000} {...field} />
                                </FormControl>
                                <FormMessage {...field} />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="sector"
                        render={({ field }) => (
                            <FormItem className="w-full h-[100px]">
                                <FormLabel className="flex flex-row gap-x-2 items-baseline">
                                    Sektör
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage {...field} />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="country_id"
                        render={({ field }) => (
                            <FormItem className="w-full h-[100px]">
                                <FormLabel className="flex flex-row gap-x-2 items-baseline">
                                    Ülke
                                </FormLabel>
                                <FormControl className="w-full">
                                    <Combobox
                                        title="Ülkeler"
                                        data={countries}
                                        onSelect={(value) => field.onChange(parseInt(value))}
                                        value={field.value?.toString()} />
                                </FormControl>
                                <FormMessage {...field} />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="city_id"
                        render={({ field }) => (
                            <FormItem className="w-full h-[100px]">
                                <FormLabel className="flex flex-row gap-x-2 items-baseline">
                                    Şehir
                                </FormLabel>
                                <FormControl className="w-full">
                                    <Combobox
                                        title="Şehirler"
                                        data={cities}
                                        onSelect={(value) => field.onChange(parseInt(value))}
                                        value={field.value?.toString()} />
                                </FormControl>
                                <FormMessage {...field} />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem className="w-full h-[100px]">
                                <FormLabel className="flex flex-row gap-x-2 items-baseline">
                                    Lokasyon
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage {...field} />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="requirements"
                        render={({ field }) => (
                            <FormItem className="w-full h-[100px]">
                                <FormLabel className="flex flex-row gap-x-2 items-baseline">
                                    Gereklilikler
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage {...field} />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="work_type"
                        render={({ field }) => (
                            <FormItem className="w-full h-[100px]">
                                <FormLabel className="flex flex-row gap-x-2 items-baseline">
                                    Çalışma Türü
                                </FormLabel>
                                <FormControl>
                                    <Combobox
                                        className="w-full"
                                        title="Çalışma Türü"
                                        data={workTypesArray}
                                        onSelect={(value) => field.onChange(value)}
                                        value={field.value?.toString()}
                                    />
                                </FormControl>
                                <FormMessage {...field} />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="employment_type"
                        render={({ field }) => (
                            <FormItem className="w-full h-[100px]">
                                <FormLabel className="flex flex-row gap-x-2 items-baseline">
                                    İstihdam Türü
                                </FormLabel>
                                <FormControl>
                                    <Combobox
                                        className="w-full"
                                        title="İstihdam Türü"
                                        data={EmploymentTypeArray}
                                        onSelect={(value) => field.onChange(value)}
                                        value={field.value?.toString()}
                                    />
                                </FormControl>
                                <FormMessage {...field} />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="has_salary"
                        render={({ field }) => (
                            <FormItem className="w-full h-[65px]">
                                <FormLabel className="flex flex-row gap-x-2 items-center">
                                    <Switch
                                        checked={field.value}
                                        onCheckedChange={(value) => field.onChange(value)}
                                        className="mt-1"
                                    />
                                    Maaş Ödemesi {field.value ? "Var" : "Yok"}
                                </FormLabel>

                                <FormMessage {...field} />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="dead_line"
                        render={({ field }) => (
                            <FormItem className="w-full h-[100px]">
                                <FormLabel className="flex flex-row gap-x-2 items-baseline">
                                    Başvuru Bitiş Tarihi
                                    <p className="text-[0.6rem] text-muted-foreground">
                                        Bu alan zorunludur ve herkes görebilir.
                                    </p>
                                </FormLabel>
                                <FormControl>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "justify-start text-left font-normal w-full",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {field.value ? format(field.value, "PPP HH:mm:ss") : <span>Tarih Seçin</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                initialFocus
                                        
                                            />
                                            <div className="p-3 border-t border-border">
                                                <TimePickerDemo setDate={field.onChange} date={field.value} />
                                            </div>
                                        </PopoverContent>
                                    </Popover>
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

export default InternshipPostingForm;
