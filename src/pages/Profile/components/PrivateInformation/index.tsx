import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { useUtil } from "@/context/UtilContext";
import { UserDetail } from "@/types";
import { Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ProfileService from "@/services/profile.service";
import {
  PrivateInformationFormTypes,
  usePrivateInformationForm,
} from "@/schemas/private-information-schema";
import PrivateInfoForm from "./PrivateInfoForm";
import moment from "moment";
import { showAccordionInProfile } from "@/utils/helpers.utils";
import { useIsReadonly } from "@/context/IsReadonlyContext";
import { ComboboxData } from "@/components/ui/combobox";
import LookupService from "@/services/lookup.service";
import { cn } from "@/lib/utils";

interface PrivateInformationProps {
  user: UserDetail;
}

function PrivateInformation({ user }: PrivateInformationProps) {
  const [showForm, setShowForm] = useState(false);
  const { loading, setLoading } = useUtil();
  const { toast } = useToast();
  const formDivRef = useRef<HTMLDivElement>(null);
  const isReadonly = useIsReadonly();
  const [countryList, setCountryList] = useState<ComboboxData>([]);
  const [cityList, setCityList] = useState<ComboboxData>([]);

  const getCountryList = async () => {
    const response = await LookupService.getCountries();
    const coutryList = response.map((item) => {
      return {
        value: item.id.toString(),
        label: item.name,
      };
    });
    setCountryList(coutryList);
  };

  const getCitiesList = async (countryId: number) => {
    if (!countryId) return;
    const response = await LookupService.getCities(countryId);
    const cityList = response.map((item) => {
      return {
        value: item.id.toString(),
        label: item.name,
      };
    });
    setCityList(cityList);
  };

  useEffect(() => {
    if (!countryList.length) getCountryList();
  }, []);

  useEffect(() => {
    if (!!user?.detail?.country_id) getCitiesList(user.detail?.country_id);
  }, [user]);

  const getGenderText = (genderEnum: string) => {
    switch (genderEnum) {
      case "Male":
        return "Erkek";
      case "Female":
        return "Kadın";
      default:
        return "Belirtilmemiş";
    }
  };

  const getMaritialStatusText = (maritalStatusEnum: string) => {
    switch (maritalStatusEnum) {
      case "Married":
        return "Evli";
      case "Single":
        return "Bekar";
      default:
        return "Belirtilmemiş";
    }
  };

  const getMilitaryStatusText = (maritalStatusEnum: string) => {
    switch (maritalStatusEnum) {
      case "Done":
        return "Yapmış";
      case "Deferred":
        return "Ertelenmiş";
      case "Exempt":
        return "Muaf";
      default:
        return "Belirtilmemiş";
    }
  };

  const handleFormSubmit = async (
    data: PrivateInformationFormTypes,
    e: any
  ) => {
    e.preventDefault();
    try {
      setLoading(true);
      await ProfileService.updateUserDetails({
        ...data,
        date_of_birth: data.date_of_birth
          ? moment(data.date_of_birth).format("YYYY-MM-DD")
          : undefined,
      } as any);
      toast({
        title: "Başarılı",
        description: "Özel bilgiler başarıyla eklendi.",
        variant: "success",
      });
      setShowForm(false);
    } catch (error) {
      toast({
        title: "Hata",
        description: "Özel bilgiler eklenirken bir hata oluştu.",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center w-full my-2">
        {!isReadonly && (
          <h5 className="text-sm font-medium my-2">
            Eklediğim Özel Bilgilerim
          </h5>
        )}
        {!isReadonly && (
          <Button
            onClick={() =>
              showAccordionInProfile(showForm, formDivRef, setShowForm)
            }
            variant="outline"
            className="flex items-center space-x-2 mb-2"
          >
            <Plus className="h-4 w-4 mr-2" />
            Özel Bilgilerinizi Düzenleyin
          </Button>
        )}
      </div>
      <div className="flex flex-col gap-1/2 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 w-full font-normal">
          <p className="text-sm my-2">
            <span className="font-semibold">Doğum Tarihi:</span>{" "}
            {user?.detail?.date_of_birth
              ? moment(user?.detail?.date_of_birth).format("DD.MM.YYYY")
              : "Girilmemiş"}
          </p>
          <p className="text-sm my-2">
            <span className="font-semibold mr-1">Cinsiyet:</span>
            {getGenderText(user?.detail?.gender)}
          </p>
          <p
            className={cn(
              "text-sm my-2",
              user?.detail?.gender !== "Male" && "invisible"
            )}
          >
            <span className="font-semibold mr-1">Askerlik Durumu:</span>
            {getMilitaryStatusText(user?.detail?.military_status)}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 w-full font-normal">
          <p className="text-sm my-2">
            <span className="font-semibold mr-1">Evlilik Durumu:</span>
            {getMaritialStatusText(user?.detail?.marital_status)}
          </p>
          <p className="text-sm my-2">
            <span className="font-semibold mr-1">Sürücü Belgeleri:</span>
            {user?.detail?.driver_licenses.join(", ")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 w-full font-normal">
          <p className="text-sm my-2">
            <span className="font-semibold mr-1">Ülke:</span>
            {
              countryList.find(
                (item: { value: string; label: string }) =>
                  item.value == user?.detail?.country_id?.toString()
              )?.label
            }
          </p>
          <p className="text-sm my-2">
            <span className="font-semibold mr-1">Şehir:</span>
            {
              cityList.find(
                (item: { value: string; label: string }) =>
                  item.value == user?.detail?.city_id?.toString()
              )?.label
            }
          </p>
          <p className="text-sm my-2">
            <span className="font-semibold mr-1">İlçe:</span>
            {user?.detail?.district}
          </p>
        </div>
        <p className="text-sm mb-2">
          <span className="font-semibold mr-1">Tam Adres:</span>
          {user?.detail?.address}
        </p>
      </div>
      <Accordion
        type="single"
        collapsible
        value={showForm ? "education" : undefined}
      >
        <AccordionItem value="education" ref={formDivRef}>
          <AccordionContent>
            <Separator className="my-1" />
            <PrivateInfoForm
              form={usePrivateInformationForm().form}
              loading={loading}
              handleFormSubmit={handleFormSubmit}
              initialValues={user.detail}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}

export default PrivateInformation;
