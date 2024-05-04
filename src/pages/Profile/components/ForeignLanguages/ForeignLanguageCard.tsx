import { Foreignlanguage } from "@/types";
import { Edit, LanguagesIcon, Trash } from "lucide-react";
import { Languages, LanguageDegree } from "@/const/languages";
import { Button } from "@/components/ui/button";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import ProfileService from "@/services/profile.service";
import { useToast } from "@/components/ui/use-toast";
import { useUtil } from "@/context/UtilContext";
import ForeignLanguageEditModal from "./ForeignLanguageEditModal";
interface ForeignLanguagesProps {
  foreignLanguage: Foreignlanguage;
}

function ForeignLanguageCard({ foreignLanguage }: ForeignLanguagesProps) {
  const { toast } = useToast();
  const { setLoading } = useUtil();

  const deleteForeignLanguageById = async (id: number) => {
    try {
      setLoading(true);
      await ProfileService.deleteForeignLanguage(id);
      toast({
        title: "Yabancı dil bilgileriniz başarıyla silindi.",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: `Yabancı dil bilgileriniz silinirken bir hata oluştu. ${error}`,
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  const handleUpdateForeignLanguage = async (data: {
    language_code: string;
    degree: string;
  }) => {
    try {
      setLoading(true);
      await ProfileService.updateForeignLanguage(foreignLanguage.id, data);
      toast({
        title: "Yabancı dil bilgileriniz başarıyla güncellendi.",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: `Yabancı dil bilgileriniz güncellenirken bir hata oluştu. ${error}`,
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col my-4 hover:border-primary border-l-4 p-4">
      <div className="flex flex-col md:flex-row items-center space-x-2 flex-wrap">
        <p className="flex gap-2 font-normal">
          <LanguagesIcon />
          {
            Languages.find(
              (lang: { value: string; label: string }) =>
                lang.value === foreignLanguage.language_code
            )?.label
          }
        </p>
        <p className="text-sm text-muted-foreground">
          {`• ${
            LanguageDegree.find(
              (degree: { value: string; label: string }) =>
                degree.value === foreignLanguage.degree
            )?.label
          }`}
        </p>
        <div className="flex items-center space-x-2">
          <ForeignLanguageEditModal
            foreignLanguage={foreignLanguage}
            triggerButton={
              <Button size="icon" variant="ghost">
                <Edit className="w-4 h-4" />
              </Button>
            }
            handleUpdateForeignLanguage={(data: {
              language_code: string;
              degree: string;
            }) => handleUpdateForeignLanguage(data)}
          />
          <ConfirmationDialog
            onConfirm={() => deleteForeignLanguageById(foreignLanguage.id)}
            triggerButton={
              <Button size="icon" variant="ghost">
                <Trash className="w-4 h-4 text-red-500" />
              </Button>
            }
            headerTitle="Eklediğim Yabancı Dil Bilgisi"
            description="Bu yabancı dil bilgisini silmek istediğinize emin misiniz?"
          />
        </div>
      </div>
    </div>
  );
}

export default ForeignLanguageCard;
