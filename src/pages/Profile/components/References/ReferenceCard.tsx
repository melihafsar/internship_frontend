import { useToast } from "@/components/ui/use-toast";
import { useUtil } from "@/context/UtilContext";
import { Reference } from "@/types";
import { Building2, Edit, Mail, Phone, Trash } from "lucide-react";
import ProfileService from "@/services/profile.service";
import ReferenceEditModal from "./ReferenceEditModal";
import { Button } from "@/components/ui/button";
import ConfirmationDialog from "@/components/ConfirmationDialog";

interface ReferenceCardProps {
  reference: Reference;
}

function ReferenceCard({ reference }: ReferenceCardProps) {
  const { toast } = useToast();
  const { setLoading } = useUtil();

  const deleteReferenceById = async (id: number) => {
    try {
      setLoading(true);
      await ProfileService.deleteReference(id);
      toast({
        title: "Referansınız başarıyla silindi.",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: `Referansınız silinirken bir hata oluştu. ${error}`,
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  const handleUpdateReference = async (data: Reference, e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      await ProfileService.updateReference(reference.id, data);
      toast({
        title: "Referansınız başarıyla güncellendi.",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: `Referansınız güncellenirken bir hata oluştu. ${error}`,
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  return (
    <div
      key={reference.id}
      className="flex flex-col my-8 hover:border-primary border-l-4 p-4"
    >
      <div className="flex flex-col md:flex-row justify-between items-center space-x-2">
        <div className="flex flex-col md:flex-row gap-1">
          <p className="font-semibold">{`■ ${reference.name} ${reference.surname}`}</p>
          •<p className="text-muted-foreground">{reference.duty}</p>
        </div>
        <div>
          <ReferenceEditModal
            reference={reference}
            triggerButton={
              <Button size="icon" variant="ghost">
                <Edit className="w-4 h-4" />
              </Button>
            }
            handleUpdateReference={handleUpdateReference}
          />
          <ConfirmationDialog
            onConfirm={() => deleteReferenceById(reference.id)}
            triggerButton={
              <Button size="icon" variant="ghost">
                <Trash className="w-4 h-4 text-red-500" />
              </Button>
            }
            headerTitle="Eklediğim Referansımı Sil"
            description="Bu referansı silmek istediğinizden emin misiniz?"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center space-x-2 text-muted-foreground text-muted-foreground">
        <div className="flex flex-col md:flex-row gap-2 items-center">
          <p className="flex">
            <Mail className="w-4 h-4 m-1 ml-0" />
            {reference.email}
          </p>
          <p className="flex">
            <Phone className="w-4 h-4 m-1 ml-0" />
            {reference.phone_number}
          </p>
        </div>

        <p className="flex">
          <Building2 className="w-4 h-4 m-1 ml-0" />
          {reference.company}
        </p>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center space-x-2">
        <p className="font-light">{reference.description}</p>
      </div>
    </div>
  );
}

export default ReferenceCard;
