import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
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
import { PhotoUploadDialog } from "./PhotoUploadDialog";
import { UserDetail } from "@/types";

interface ContactDetailsProps {
  user: UserDetail;
  setUser?: React.Dispatch<React.SetStateAction<UserDetail>>;
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
  const { toast } = useToast();

  const handleFormSubmit = async (data: any) => {
    try {
      setLoading(true);
      await ProfileService.updateUserInfo({
        name: data.name,
        surname: data.surname,
        phone_number: data.phoneNumber,
      });
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

  return (
    <>
      <PhotoUploadDialog
        show={showUploadDialog}
        dialogClose={() => setShowUploadDialog(false)}
      />
      <div className="flex flex-col md:flex-row items-center justify-between mb-4">
        <div
          className="hover:opacity-60 flex items-center relative group cursor-pointer"
          onClick={() => setShowUploadDialog(true)}
        >
          <Pencil className="absolute h-6 w-6 top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 z-50" />
          <Avatar className="h-32 w-32 m-4">
            <AvatarImage src={user?.profile_photo_url} alt="profil_resmim" />
            <AvatarFallback>MA</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-1 flex-col space-y-2">
          <div className="flex flex-col gap-y-2 md:gap-y-0 md:flex-row justify-between items-center">
            <h1 className="scroll-m-20 text-xl font-extrabold tracking-tight lg:text-2xl">
              {user.name} {user.surname}
            </h1>
            <Button
              onClick={() => setShowForm(!showForm)}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <Pencil className="h-4 w-4 mr-2" />
              Bilgilerinizi Düzenleyin
            </Button>
          </div>
          <div className="mb-2 text-muted-foreground text-[12px] md:text-sm">
            <div className="flex space-x-1 justify-between">
              <p>Frontend Developer</p>
              <p>İstanbul, Türkiye</p>
            </div>
            <div className="flex space-x-1 justify-between">
              <p>22 yaşında</p>
              <p>Marmara Üniversitesi</p>
            </div>
            <div className="flex space-x-1 justify-between flex-wrap">
              <p>Twitter: @shadcn</p>
              <p>Website: https://shadcn.com</p>
            </div>
          </div>
        </div>
      </div>

      <Accordion
        type="single"
        value={showForm ? "profile" : undefined}
        collapsible
      >
        <AccordionItem value="profile">
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