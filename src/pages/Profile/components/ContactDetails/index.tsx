import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Linkedin, Pencil } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@/components/ui/avatar";
import { useContactDetailsForm } from "@/schemas/contact-details-form.schema";
import { Input } from "@/components/ui/input";
import { useUtil } from "@/context/UtilContext";
import ProfileService from "@/services/profile.service";
import { useToast } from "@/components/ui/use-toast";
import { ApiErrorData } from "@/types/error";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ImageUploadDialog } from "../../../../components/ImageUploadDialog";
import { UserDetail } from "@/types";
import { useIsReadonly } from "@/context/IsReadonlyContext";
import { useLocation } from "react-router-dom";
import { showAccordionInProfile } from "@/utils/helpers.utils";
import React from "react";
import LookupService from "@/services/lookup.service";
import { useAuth } from "@/context/AuthContext";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ImportLinkedinDialog } from "./ImportLinkedinModal";
import { EducationFormTypes } from "@/schemas/education-form.schema";
import { WorkFormTypes } from "@/schemas/work-form.schema";

interface ContactDetailsProps {
  user: UserDetail;
}

const ContactDetailsForm = ({
  user,
  form,
  loading,
  handleFormSubmit,
}: {
  user: UserDetail;
  form: any;
  loading: boolean;
  handleFormSubmit: (data: any) => void;
}) => {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(() => handleFormSubmit(form.getValues()))}
        className="mx-2 space-y-4"
      >
        <div className="flex flex-col md:flex-row space-y-4 md:space-x-4 md:space-y-0 justify-between mt-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full md:w-1/2 h-[100px]">
                <FormLabel className="flex flex-row gap-x-2 items-baseline">
                  İsminiz
                  <p className="text-[0.6rem] text-muted-foreground">
                    Bu alan zorunludur ve herkes görebilir.
                  </p>
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    placeholder={user.name}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="surname"
            render={({ field }) => (
              <FormItem className="w-full md:w-1/2 h-[100px]">
                <FormLabel className="flex flex-row gap-x-2 items-baseline">
                  Soyisminiz
                  <p className="text-[0.6rem] text-muted-foreground">
                    Bu alan zorunludur ve herkes görebilir.
                  </p>
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder={user.surname}
                    {...field}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col md:flex-row space-y-4 md:space-x-4 md:space-y-0 justify-between">
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem className="w-full md:w-1/2 h-[100px]">
                <FormLabel className="flex flex-row gap-x-2 items-baseline">
                  Telefon Numaranız
                  <p className="text-[0.6rem] text-muted-foreground">
                    Bu alan isteğe bağlıdır, herkes görebilir.
                  </p>
                </FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    {...field}
                    placeholder={user.phone_number}
                    value={field.value}
                    pattern="[0-9]{11}"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full md:w-1/2 h-[100px]">
                <FormLabel className="flex flex-row gap-x-2 items-baseline">
                  E-posta Adresiniz
                  <p className="text-[0.6rem] text-muted-foreground">
                    Bu alanı değiştiremezsiniz.
                  </p>
                </FormLabel>
                <FormControl>
                  <Input type="email" {...field} value={user.email} disabled />
                </FormControl>
                <FormMessage />
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
          Bilgilerimi Güncelle
        </Button>
      </form>
    </Form>
  );
};

function ContactDetails({ user }: ContactDetailsProps) {
  const [showForm, setShowForm] = useState(false);
  const { loading, setLoading } = useUtil();
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const { linkedinProviderToken, supabase } = useAuth();
  const [linkedinImportState, setLinkedinImportState] = useState<{
    linkedLinkedin: boolean,
    scrapingLinkedin: boolean,
    showDialog: boolean
  }>({ linkedLinkedin: false, scrapingLinkedin: false, showDialog: false });
  const [scrapeResult, setScrapeResult] = useState<{ educations: EducationFormTypes[], work_history: WorkFormTypes[] }>();
  const [showLinkedinImportDialog, setshowLinkedinImportDialog] = useState(false);

  const { toast } = useToast();
  const isReadonly = useIsReadonly();

  const location = useLocation();
  const formDivRef = React.useRef<HTMLDivElement>(null);

  const [countryList, setCountryList] = useState<
    { id: number; name: string }[]
  >([]);
  const [cityList, setCityList] = useState<{ id: number; name: string }[]>([]);

  const getCountryList = async () => {
    const response = await LookupService.getCountries();
    setCountryList(response);
  };

  const getCitiesList = async (countryId: number) => {
    const response = await LookupService.getCities(countryId);
    setCityList(response);
  };

  useEffect(() => {
    if (!countryList.length) getCountryList();
  }, []);

  useEffect(() => {
    if (user.detail?.country_id) getCitiesList(user.detail?.country_id);
  }, [user.detail?.country_id]);

  useEffect(() => {
    if (location.state === "username required") {
      showAccordionInProfile(showForm, formDivRef, setShowForm);
      toast({
        title: "Önce Ad ve Soyad Bilgilerinizi Doldurun",
        description:
          "Profilinizi tamamlamak için ad ve soyad bilgilerinizi doldurmalısınız.",
        variant: "destructive",
      });
    }
  }, [location]);

  const linkWithLinkedin = async () => {
    if (!linkedinImportState.linkedLinkedin) {
      await supabase.auth.linkIdentity({
        provider: "linkedin_oidc",
        options: {
          redirectTo: window.location.origin + "/profile",
        }
      });

      return;
    }

    try {
      setLinkedinImportState({ ...linkedinImportState, scrapingLinkedin: true });

      if (!linkedinProviderToken) {
        toast({
          title: "Hata",
          description: "Linkedin Hesabı ile bağlantı kurulamadı.",
          variant: "destructive",
        });
        setLinkedinImportState({ ...linkedinImportState, scrapingLinkedin: false });
        return
      }
      if (!scrapeResult) {
        const result = await ProfileService.scrapeLinkedin({ access_token: linkedinProviderToken.access_token });
        setLinkedinImportState({ ...linkedinImportState, showDialog: true });
        setScrapeResult({ educations: result.educations, work_history: result.work_history });
      }
      setshowLinkedinImportDialog(true);
    } catch (error: any) {
      toast({
        title: "Hata",
        description: error.response.error.details,
        variant: "destructive",
      });
    } finally {
      setLinkedinImportState({ ...linkedinImportState, scrapingLinkedin: false });
    }
  };

  const checkLinkedinLink = async () => {
    if (linkedinProviderToken) {
      setLinkedinImportState({ ...linkedinImportState, linkedLinkedin: true });
    }
  }

  useEffect(() => {
    checkLinkedinLink();
  }, []);

  const handleFormSubmit = async (data: any) => {
    try {
      setLoading(true);
      await ProfileService.updateUserInfo({
        name: data.name,
        surname: data.surname,
        phone_number: data.phoneNumber,
      });
      await supabase.auth.refreshSession();
      toast({
        title: "Başarılı",
        description: "Bilgileriniz başarıyla güncellendi.",
        variant: "success",
      });
    } catch (error: { response: { data: { error: ApiErrorData } } } | any) {
      toast({
        title: "Hata",
        description: error.response.data.error.details,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (
    e: React.FormEvent<HTMLFormElement>,
    uploadFile: File | null
  ) => {
    e.preventDefault();
    if (!uploadFile) {
      toast({
        title: "Lütfen bir resim dosyası seçin!",
        variant: "destructive",
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", uploadFile);

    try {
      await ProfileService.updateProfileImage(formData);
      toast({
        title: "Resminiz başarıyla yüklendi.",
        variant: "success",
      });
      window.location.reload();
    } catch (error) {
      toast({
        title: `Resim yüklenirken bir hata oluştu. ${error}`,
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <ImageUploadDialog
        show={showUploadDialog}
        dialogClose={() => setShowUploadDialog(false)}
        handleFileUpload={handleFileUpload}
      />
      <ImportLinkedinDialog
        show={showLinkedinImportDialog}
        dialogClose={() => setshowLinkedinImportDialog(false)}
        data={scrapeResult}
        setData={setScrapeResult}
      />

      <div className="flex flex-col md:flex-row items-center justify-between mb-4">
        <div
          className="hover:opacity-60 flex items-center relative group cursor-pointer"
          onClick={() => {
            if (isReadonly) return;
            setShowUploadDialog(true);
          }}
        >
          {!isReadonly && (
            <Pencil className="absolute h-6 w-6 top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 z-50" />
          )}
          <Avatar className="h-32 w-32 m-4">
            <AvatarImage src={user?.profile_photo_url} alt="profil_resmim" />
            <AvatarFallback>
              {user?.name
                ? user?.name?.charAt(0).toUpperCase() +
                user?.surname?.charAt(0).toUpperCase()
                : user?.email?.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-1 flex-col space-y-2">
          <div className="flex flex-col gap-y-2 md:gap-y-0 md:flex-row justify-between items-center">
            <h1 className="scroll-m-20 text-xl font-extrabold tracking-tight lg:text-2xl">
              {user.name || "Ad"} {user.surname || "Soyad"}
            </h1>
            <div className="flex flex-col gap-2">
              {!isReadonly && linkedinImportState.linkedLinkedin && <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={() => linkWithLinkedin()}
                      className="flex items-center space-x-2 bg-[#0077b5] text-white hover:bg-[#00669d]"
                      disabled={linkedinImportState.scrapingLinkedin}
                    >
                      <Linkedin className="h-4 w-4 mr-2" />
                      Linkedin ile Doldur
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    {
                      linkedinImportState.linkedLinkedin ? "Bilgilerinizi Linkedin Hesabınızdan Doldurun." : "Bilgilerinizi Linkedin Hesabınızdan Doldurmak için Linkedin ile Bağlanın."
                    }
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>}
              {!isReadonly && (
                <Button
                  onClick={() => setShowForm(!showForm)}
                  variant="outline"
                  className="flex items-center space-x-2"
                >
                  <Pencil className="h-4 w-4 mr-2" />
                  Bilgilerinizi Düzenleyin
                </Button>
              )}
            </div>
          </div>
          <div className="mb-2 text-muted-foreground text-[12px] md:text-sm">
            <div className="flex space-x-1 justify-between">
              <p>
                {user?.works?.length > 0
                  ? user.works[user?.works?.length - 1].position
                  : "Pozisyon Bilgisi Yok"}
              </p>
              {cityList.find((item) => item.id === user.detail.city_id)?.name +
                ", " +
                countryList.find((item) => item.id === user.detail?.country_id)
                  ?.name}
            </div>
            <div className="flex space-x-1 justify-between">
              <p>
                {user.detail?.date_of_birth
                  ? `${new Date().getFullYear() -
                  new Date(user.detail?.date_of_birth).getFullYear()
                  } Yaşında`
                  : "Yaş Bilgisi Yok"}
              </p>
              <p>
                {user.university_educations.length > 0
                  ? user.university_educations[
                    user.university_educations.length - 1
                  ].university_name
                  : "Eğitim Bilgisi Yok"}
              </p>
            </div>
            <div className="flex space-x-1 justify-between flex-wrap">
              <a href={"mailto:" + user.email}>{user.email}</a>
              <p>
                {user.foreign_languages.length > 0
                  ? `Yabancı Dil: ${user.foreign_languages[user.foreign_languages.length - 1]
                    .language_code +
                  " - " +
                  user.foreign_languages[user.foreign_languages.length - 1]
                    .degree
                  }`
                  : "Yabancı Dil Bilgisi Yok"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Accordion
        type="single"
        value={showForm ? "profile" : undefined}
        collapsible
      >
        <AccordionItem value="profile" ref={formDivRef}>
          <AccordionContent>
            <Separator className="my-1" />
            <ContactDetailsForm
              user={user}
              form={useContactDetailsForm().form}
              loading={loading}
              handleFormSubmit={handleFormSubmit}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}

export default ContactDetails;
