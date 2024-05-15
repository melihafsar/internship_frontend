import { Button } from "@/components/ui/button";
import { InternshipPostingFormTypes } from "@/schemas/internship-posting.schema";
import { BellRing } from "lucide-react";
import { useState } from "react";
import internshipService from "@/services/internship.service";

import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

interface CompanyInfoBannerProps {
  posting: InternshipPostingFormTypes;
  userType: number | null;
}

function CompanyInfoBanner({ posting, userType }: CompanyInfoBannerProps) {
  const [isFollowingCompany, setIsFollowingCompany] = useState(
    posting?.company?.is_current_user_following || false
  );
  const [isFollowingPosting, setIsFollowingPosting] = useState(
    posting?.is_current_user_following || false
  );

  const companyId = posting.company?.id;
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleFollowCompanyClick = async () => {
    try {
      await internshipService.followCompany(companyId, !isFollowingCompany);
      setIsFollowingCompany(!isFollowingCompany);
    } catch (error) {
      toast({
        title: "Hata",
        description: "Şirket takip edilirken bir hata oluştu.",
        variant: "destructive",
      });
    }
  };

  const handleFollowPostingClick = async () => {
    try {
      if (posting.id) {
        await internshipService.followPosting(posting.id, !isFollowingCompany);
        setIsFollowingPosting(!isFollowingCompany);
      }
    } catch (error) {
      toast({
        title: "Hata",
        description: "İlan takip edilirken bir hata oluştu.",
        variant: "destructive",
      });
    }
  };

  const handleCompanyClick = () => {
    navigate(`/company-detail/${companyId}`);
  };

  return (
    <div className="flex flex-col w-full items-center">
      <img
        className="object-cover bg-gray-100 w-full max-h-[350px] hover:opacity-95 transform transition-transform duration-1000"
        src={posting?.background_photo_url || "/no-image.svg"}
      />
      <div className="flex flex-col md:flex-row w-full bg-secondary h-[200px] md:h-[110px] gap-2">
        <img
          className="rounded-md object-cover bg-gray-100 w-[64px] md:w-[128px] border-2 border-white -mt-12 ml-16 z-10 h-[64px] md:h-[128px] cursor-pointer"
          src={posting.company?.logo_url || "/no-image.svg"}
          onClick={handleCompanyClick}
        />
        <div className="flex flex-col md:flex-row justify-between items-center h-full w-full pb-4 md:pb-0 mx-0 md:mx-4">
          <div className="flex flex-col h-full mx-2 justify-center items-center md:items-start">
            <h1
              className="font-extrabold text-xl mt-2 text-primary cursor-pointer"
              onClick={handleCompanyClick}
            >
              {posting.company?.name}
            </h1>
            <h5 className="text-muted-foreground text-base">{posting.title}</h5>
          </div>
          <div className="flex flex-col gap-1 justify-center items-center h-full">
            <Button
              variant="default"
              className="flex font-semibold rounded-md w-52 gap-2 justify-center m-0 md:mr-16"
              size="sm"
              onClick={handleFollowCompanyClick}
              disabled={!(userType === 0)}
            >
              <BellRing
                fill={isFollowingCompany ? "currentColor" : "none"}
                size={16}
              />
              Şirket{isFollowingCompany ? " Takip Ediliyor" : "i Takip Et"}
            </Button>

            <Button
              variant="default"
              className="flex font-semibold rounded-md w-52 gap-2 justify-center m-0 md:mr-16"
              size="sm"
              onClick={handleFollowPostingClick}
              disabled={!(userType === 0)}
            >
              <BellRing
                fill={isFollowingPosting ? "currentColor" : "none"}
                size={16}
              />
              Başvuru{isFollowingPosting ? " Takip Ediliyor" : "yu Takip Et"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyInfoBanner;
