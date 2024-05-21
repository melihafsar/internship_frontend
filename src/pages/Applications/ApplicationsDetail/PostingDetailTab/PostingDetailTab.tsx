import { InternshipPostingFormTypes } from "@/schemas/internship-posting.schema";
import ApplyPostingComponents from "./ApplyPostingComponents";
import { workTypesArray } from "@/const";
import { Wallet, Briefcase } from "lucide-react";
import { useEffect, useState } from "react";
import LookupService from "@/services/lookup.service";

interface PostingDetailTabProps {
  posting: InternshipPostingFormTypes;
  userType: number | null;
}

function PostingDetailTab({ posting, userType }: PostingDetailTabProps) {
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
    if (posting.country_id) getCitiesList(posting.country_id);
  }, [posting.country_id]);

  return (
    <div className="flex flex-col w-full h-full items-center justify-center border-4 border-secondary rounded-md">
      <div className="flex flex-col w-full gap-4 p-6">
        <h1 className="text-2xl">Staj İlanının Detayları</h1>
        <div className="flex flex-col w-full gap-4">
          <p className="">{posting?.description}</p>
          <p>
            <span className="text-lg">Sektör: </span>
            {posting?.sector}
          </p>
          <p>
            <span className="text-base font-medium">Çalışma Konumu: </span>
            {`${posting?.location} - ${
              cityList.find((item) => item.id === posting.city_id)?.name
            }, ${
              countryList.find((item) => item.id === posting.country_id)?.name
            }`}
          </p>
          <p>
            <span className="text-base font-medium">Gereklilikler: </span>
            {posting?.requirements}
          </p>
          <div className="flex flex-row items-center w-full gap-2">
            <p className="flex gap-1 text-sm text-gray-400 items-center">
              <Wallet />
              {posting.has_salary ? "Maaşlı" : "Maaşsız"}
            </p>
            <p className="flex gap-1 text-sm text-gray-400 items-center">
              <Briefcase />
              {
                workTypesArray.find((item) => item.value === posting.work_type)
                  ?.label
              }
            </p>
          </div>
          <p>
            <span className="text-base font-medium">Son Başvuru Tarihi: </span>
            {new Date(posting.dead_line).toLocaleDateString("tr-TR")}
          </p>
        </div>
      </div>
      <ApplyPostingComponents
        postingId={posting?.id}
        userType={userType}
        isApplied={posting?.is_current_user_applied}
        deadLine={posting?.dead_line}
      />
    </div>
  );
}

export default PostingDetailTab;
