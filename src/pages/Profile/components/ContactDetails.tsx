import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@/components/ui/avatar";
import { useContactDetailsForm } from "@/schemas/contact-details-form.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUtil } from "@/context/UtilContext";
import { Combobox } from "@/components/ui/combobox";
import ProfileService from "@/services/profile.service";
import { useToast } from "@/components/ui/use-toast";
import { ApiErrorData } from "@/types/error";

interface ContactDetailsProps {
  user?: { username: string; email: string };
  setUser?: (user: { username: string; email: string }) => void;
}

const ContactDetailsForm = ({
  form,
  loading,
  comboboxData,
  handleFormSubmit,
}: {
  form: any;
  loading: boolean;
  comboboxData: [{ value: string; label: string }] | [];
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
                  <Input type="text" {...field} value={field.value} />
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
                  <Input type="text" {...field} value={field.value} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col md:flex-row space-y-4 md:space-x-4 md:space-y-0 justify-between">
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem className="w-full md:w-1/2 h-[100px]">
                <FormLabel className="flex flex-row gap-x-2 items-baseline">
                  Yaşınız
                  <p className="text-[0.6rem] text-muted-foreground">
                    Bu alan isteğe bağlıdır, herkes görebilir.
                  </p>
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(parseInt(e.target.value));
                    }}
                    min={0}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="universityName"
            render={({ field }) => (
              <FormItem className="w-full md:w-1/2 h-[100px]">
                <FormLabel className="flex flex-row gap-x-2 items-baseline">
                  Üniversiteniz
                  <p className="text-[0.6rem] text-muted-foreground">
                    Bu alan isteğe bağlıdır, herkes görebilir.
                  </p>
                </FormLabel>
                <FormControl>
                  <Combobox
                    {...field}
                    data={comboboxData}
                    title="Üniversite seçin"
                    className="w-full"
                    onSelect={(selectedValue) => {
                      form.setValue("universityName", selectedValue);
                    }}
                  />
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

function ContactDetails({ user, setUser }: ContactDetailsProps) {
  const [showForm, setShowForm] = useState(false);
  const { loading, setLoading } = useUtil();
  const [universities, setUniversities] = useState<
    [{ value: string; label: string }] | []
  >([]);
  const { toast } = useToast();

  const handleFormSubmit = async (data: any) => {
    try {
      setLoading(true);
      const response = await ProfileService.updateUserInfo(data);
      setUser && setUser(response.data);
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

  const fetchAllUniversities = async () => {
    if (universities.length > 0) return;
    try {
      const { data } = await ProfileService.getUniversities();
      const formattedData = data.map(
        (uni: { university_id: number; name: string }) => ({
          value: uni.name,
          label: uni.name,
        })
      );
      setUniversities(formattedData);
    } catch (error) {
      toast({
        title: "Hata",
        description: "Üniversiteler getirilirken bir hata oluştu.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-between mb-4">
        <Avatar className="h-32 w-32 m-4">
          <AvatarImage
            src="https://media.licdn.com/dms/image/D4D03AQFKXnb4_37upQ/profile-displayphoto-shrink_400_400/0/1704967127601?e=1714608000&v=beta&t=TS23KpCiHUQup8RoH9Wmvw90_GTnlAN0jbBimuk_wbg"
            alt="profil_resmim"
          />
          <AvatarFallback>MA</AvatarFallback>
        </Avatar>
        <div className="flex flex-1 flex-col space-y-2">
          <div className="flex flex-col gap-y-2 md:gap-y-0 md:flex-row justify-between items-center">
            <h1 className="scroll-m-20 text-xl font-extrabold tracking-tight lg:text-2xl">
              Melih Afşar
            </h1>

            <Button
              onClick={() => {
                setShowForm(!showForm);
                universities.length === 0 && fetchAllUniversities();
              }}
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
              form={useContactDetailsForm().form}
              loading={loading}
              comboboxData={universities}
              handleFormSubmit={handleFormSubmit}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}

export default ContactDetails;
