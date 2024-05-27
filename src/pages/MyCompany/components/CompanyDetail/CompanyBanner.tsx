import { BellRing, Pencil } from "lucide-react";

import UploadService from "@/services/upload.service";
import { FieldPath, UseFormReturn } from "react-hook-form";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { CompanyFormTypes } from "@/schemas/company-form.schema";
import locationService from "@/services/lookup.service";
import { ImageUploadDialog } from "@/components/ImageUploadDialog";
import { cn } from "@/lib/utils";
import InternshipService from "@/services/internship.service";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { getUserType } from "@/utils/helpers.utils";

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
  isReadonly?: boolean;
}

function CompanyBanner({
  form,
  companyImages,
  setCompanyImages,
  handleFormSubmit,
  isReadonly,
}: CompanyBannerProps) {
  const [uploadDialogProps, setUploadDialogProps] = useState<{
    show: boolean;
    field?: FieldPath<CompanyFormTypes>;
    type?: "Image" | "Background";
  }>({ show: false, field: undefined });
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState<number | null>(null);
  const [isFollowingCompany, setIsFollowingCompany] = useState(false);
  const [location, setLocation] = useState<{ country: string; city: string }>({
    country: "",
    city: "",
  });
  const { toast } = useToast();
  const { supabase } = useAuth();

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      const type = getUserType(session);
      setUserType(type);
    });
    return () => {
      data?.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    setIsFollowingCompany(form.getValues("is_current_user_following"));
  }, [form.watch("is_current_user_following")]);

  const fetchCountries = async (countryId: number) => {
    const result = await locationService.getCountries();
    return result.find((item) => item.id === Number(countryId));
  };

  const fetchCities = async (countryId: number, cityId: number) => {
    const result = await locationService.getCities(countryId);
    return result.find((item) => item.id === cityId);
  };

  const getLocation = async () => {
    const countryId = form.getValues("country_id");
    const cityId = form.getValues("city_id");
    if (!countryId || !cityId) return;
    const matchedCountry = await fetchCountries(countryId);
    const matchedCity = await fetchCities(countryId, cityId);

    setLocation({
      country: matchedCountry?.name || "",
      city: matchedCity?.name || "",
    });
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

  const handleFollowCompanyClick = async () => {
    try {
      await InternshipService.followCompany(
        form.getValues("id"),
        !isFollowingCompany
      );
      setIsFollowingCompany(!isFollowingCompany);
    } catch (error) {
      toast({
        title: "Hata",
        description: "Şirket takip edilirken bir hata oluştu.",
        variant: "destructive",
      });
    }
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
            className={cn(
              "relative flex items-center group cursor-pointer",
              isReadonly ? "" : "hover:opacity-60 "
            )}
            onClick={() => {
              if (isReadonly) return;
              return setUploadDialogProps({
                show: true,
                field: "background_photo_url",
                type: "Background",
              });
            }}
          >
            {!isReadonly && <EditIcon />}
            <img
              className="rounded-md object-cover bg-gray-100 w-full max-h-[300px]"
              src={companyImages.background}
            />
          </div>
        </div>
        <div className="md:absolute md:top-[150px] md:left-[50px]">
          <div
            className="relative flex items-center group cursor-pointer"
            onClick={() => {
              if (isReadonly) return;
              return setUploadDialogProps({
                show: true,
                field: "logo_url",
                type: "Image",
              });
            }}
          >
            {!isReadonly && <EditIcon />}
            <img
              className="rounded-md object-cover bg-gray-100 w-[256px]"
              src={companyImages.logo}
            />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row md:absolute md:top-[320px] md:left-[350px] w-full md:w-[calc(100%-350px)]">
          <div className="flex flex-col w-full gap-2">
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
          </div>
          <Button
            variant="default"
            className="flex font-semibold rounded-md w-52 gap-2 justify-center mt-2 md:m-0"
            size="sm"
            onClick={handleFollowCompanyClick}
            disabled={!(userType === 0) || isFollowingCompany}
          >
            <BellRing
              fill={isFollowingCompany ? "currentColor" : "none"}
              size={16}
            />
            Şirket{isFollowingCompany ? " Takip Ediliyor" : "i Takip Et"}
          </Button>
        </div>
      </div>
      <div className="mt-4 md:mt-24">
        <p className="text-muted-foreground">{form.getValues("description")}</p>
      </div>
    </>
  );
}

export default CompanyBanner;
