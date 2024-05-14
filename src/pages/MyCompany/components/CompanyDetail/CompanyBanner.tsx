import { Pencil } from "lucide-react";
import { ImageUploadDialog } from "@/pages/Profile/components/ContactDetails/ImageUploadDialog";
import UploadService from "@/services/upload.service";
import { FieldPath, UseFormReturn } from "react-hook-form";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { CompanyFormTypes } from "@/schemas/company-form.schema";
import locationService from "@/services/lookup.service";
import { count } from "console";

const EditIcon = () => {
  return (
    <div className="absolute bg-background p-2 rounded-full top-2 right-2 opacity-0 group-hover:opacity-100 z-50">
      <Pencil />
    </div>
  );
};

interface CompanyBannerProps {
  form: UseFormReturn<CompanyFormTypes>;
  companyImages: { logo: string; background: string };
  setCompanyImages: (images: { logo: string; background: string }) => void;
  handleFormSubmit: (data: CompanyFormTypes) => void;
}

function CompanyBanner({
  form,
  companyImages,
  setCompanyImages,
  handleFormSubmit,
}: CompanyBannerProps) {
  const [uploadDialogProps, setUploadDialogProps] = useState<{
    show: boolean;
    field?: FieldPath<CompanyFormTypes>;
    type?: "Image" | "Background";
  }>({ show: false, field: undefined });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [location, setLocation] = useState<{ country: string; city: string }>({
    country: "",
    city: "",
  });

  const fetchCountries = async (countryId: number) => {
    const result = await locationService.getCountries();
    const matchedCountry = result.find((item) => item.id === Number(countryId));
    setLocation({ ...location, country: matchedCountry?.name || "" });
  };

  const fetchCities = async (countryId: number, cityId: number) => {
    const result = await locationService.getCities(countryId);
    const matchedCity = result.find((item) => item.id === cityId);
    setLocation({ ...location, city: matchedCity?.name || "" });
  };

  const getLocation = async () => {
    const countryId = form.getValues("country_id");
    const cityId = form.getValues("city_id");
    if (!countryId || !cityId) return;
    fetchCountries(countryId);
    fetchCities(countryId, cityId);
  };

  useEffect(() => {
    getLocation();
  }, [form.watch("country_id"), form.watch("city_id")]);

  const handleUploadImage = async (
    e: React.FormEvent<HTMLFormElement>,
    file: File
  ) => {
    e.preventDefault();
    if (
      !file ||
      uploadDialogProps.field === undefined ||
      uploadDialogProps.type === undefined
    ) {
      toast({
        title: "Lütfen bir resim dosyası seçin!",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    const result = await UploadService.uploadImage(
      file,
      uploadDialogProps.type
    );
    if (!result) {
      toast({
        title: "Resim yüklenirken bir hata oluştu.",
        variant: "destructive",
      });
      return;
    }
    if (uploadDialogProps.field === "logo_url")
      setCompanyImages({ ...companyImages, logo: result.url });
    else if (uploadDialogProps.field === "background_photo_url")
      setCompanyImages({ ...companyImages, background: result.url });
    form.setValue(uploadDialogProps.field, result.url);
    handleFormSubmit(form.getValues());
    setUploadDialogProps({ show: false });
    setLoading(false);
  };

  return (
    <>
      <div className="w-full relative md:pb-32">
        <ImageUploadDialog
          show={uploadDialogProps.show}
          dialogClose={() =>
            setUploadDialogProps({ ...uploadDialogProps, show: false })
          }
          handleFileUpload={handleUploadImage}
          loading={loading}
        />
        <div className="w-full">
          <div
            className="hover:opacity-60 relative flex items-center group cursor-pointer"
            onClick={() =>
              setUploadDialogProps({
                show: true,
                field: "background_photo_url",
                type: "Background",
              })
            }
          >
            <EditIcon />
            <img
              className="rounded-md object-cover bg-gray-100 w-full max-h-[300px]"
              src={companyImages.background}
            />
          </div>
        </div>
        <div className="md:absolute md:top-[150px] md:left-[50px]">
          <div
            className="relative flex items-center group cursor-pointer"
            onClick={() =>
              setUploadDialogProps({
                show: true,
                field: "logo_url",
                type: "Image",
              })
            }
          >
            <EditIcon />
            <img
              className="rounded-md object-cover bg-gray-100 w-[256px]"
              src={companyImages.logo}
            />
          </div>
        </div>
        <div className="flex flex-col md:absolute md:top-[320px] md:left-[350px]">
          <h1 className="font-extrabold text-3xl mt-2">
            {form.getValues("name")}
          </h1>
          <p className="text-muted-foreground text-lg">
            {form.getValues("short_description")}
          </p>
          <p className="text-muted-foreground">
            {form.getValues("website_url")} -{" "}
            {`${
              form.getValues("number_of_workers") &&
              form.getValues("number_of_workers") + " çalışan - "
            }`}
            {form.getValues("sector")} - {location.city}, {location.country}
          </p>
          <p className="text-muted-foreground text-sm"></p>
        </div>
      </div>
      <div className="my-4">
        <p className="text-muted-foreground">{form.getValues("description")}</p>
      </div>
    </>
  );
}

export default CompanyBanner;
