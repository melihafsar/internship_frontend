import { Button } from "@/components/ui/button";
import { Combobox, ComboboxData } from "@/components/ui/combobox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { ImageUploadDialog } from "@/pages/Profile/components/ContactDetails/ImageUploadDialog";
import { CompanyFormTypes } from "@/schemas/company-form.schema";
import locationService from "@/services/location.service";
import UploadService from "@/services/upload.service";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { FieldPath, UseFormReturn } from "react-hook-form";


const EditIcon = () => {
    return (
        <div className="absolute bg-background p-2 rounded-full top-2 right-2 opacity-0 group-hover:opacity-100 z-50">
            <Pencil />
        </div>
    )
}


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
    const [uploadDialogProps, setUploadDialogProps] = useState<{ show: boolean, field?: FieldPath<CompanyFormTypes>, type?: "Image" | "Background" }>({ show: false, field: undefined })
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
        if (!file || uploadDialogProps.field === undefined || uploadDialogProps.type === undefined) {
            toast({
                title: "Lütfen bir resim dosyası seçin!",
                variant: "destructive",
            });
            return;
        }

        const result = await UploadService.uploadImage(file, uploadDialogProps.type)
        if (!result) {
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
                <div className="flex flex-col space-y-4 justify-between mt-8 items-center">
                    <div className="w-full relative pb-[125px]">
                        <FormField
                            control={form.control}
                            name="background_photo_url"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel className="flex flex-row gap-x-2 items-baseline">
                                        Logo
                                    </FormLabel>
                                    <FormControl className="w-full">
                                        <div className="hover:opacity-60 relative flex items-center group cursor-pointer"
                                            onClick={() => setUploadDialogProps({ show: true, field: field.name, type: "Background" })}>
                                            <EditIcon />
                                            <img className="rounded-md object-cover bg-gray-100 w-full max-h-[300px]" src={field.value ?? "./no-image.svg"} />
                                        </div>
                                    </FormControl>
                                    <FormMessage {...field} />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="logo_url"
                            render={({ field }) => (
                                <FormItem className="absolute top-[150px] left-[50px]">
                                    <FormControl>
                                        <div className="relative flex items-center group cursor-pointer"
                                            onClick={() => setUploadDialogProps({ show: true, field: field.name, type: "Image" })}>
                                            <EditIcon />
                                            <img className="rounded-md object-cover bg-gray-100 w-[256px]" src={field.value ?? "./no-image.svg"} />
                                        </div>
                                    </FormControl>
                                    <FormMessage {...field} />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="w-full h-[100px]">
                                <FormLabel className="flex flex-row gap-x-2 items-baseline">
                                    Şirket İsmi
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
                        name="short_description"
                        render={({ field }) => (
                            <FormItem className="w-full h-[100px]">
                                <FormLabel className="flex flex-row gap-x-2 items-baseline">
                                    Kısa Açıklama
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
                        name="website_url"
                        render={({ field }) => (
                            <FormItem className="w-full h-[100px]">
                                <FormLabel className="flex flex-row gap-x-2 items-baseline">
                                    Web Sitesi
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
                            <FormItem className="w-full h-[100px]">
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
                        name="number_of_workers"
                        render={({ field }) => (
                            <FormItem className="w-full h-[100px]">
                                <FormLabel className="flex flex-row gap-x-2 items-baseline">
                                    Çalışan Sayısı
                                    <p className="text-[0.6rem] text-muted-foreground">
                                        Yaklaşık değer girilebilir. Sayfanızda örnek: 2000+ şeklinde gözükecektir.
                                    </p>
                                </FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
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
