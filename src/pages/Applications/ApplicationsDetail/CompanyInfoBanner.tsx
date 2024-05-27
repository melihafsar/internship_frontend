import { Button } from "@/components/ui/button";
import { InternshipPostingFormTypes } from "@/schemas/internship-posting.schema";
import { BellRing } from "lucide-react";
import { useEffect, useState } from "react";
import internshipService from "@/services/internship.service";

import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
interface CompanyInfoBannerProps {
  posting: InternshipPostingFormTypes;
  userType: number | null;
}

function CompanyInfoBanner({ posting, userType }: CompanyInfoBannerProps) {
  const [isFollowingPosting, setIsFollowingPosting] = useState(false);

  useEffect(() => {
    setIsFollowingPosting((posting as any)?.is_current_user_following || false);
  }, [posting]);

  const companyId = (posting as any).company?.company_id;
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleFollowPostingClick = async () => {
    try {
      if (posting.id) {
        await internshipService.followPosting(posting.id, !isFollowingPosting);
        setIsFollowingPosting(!isFollowingPosting);
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
      <div className="flex flex-col md:flex-row w-full bg-secondary h-[140px] md:h-[90px] gap-2">
        <img
          className="rounded-md object-cover bg-gray-100 w-[64px] md:w-[128px] border-2 border-white -mt-12 ml-16 z-10 h-[64px] md:h-[128px] cursor-pointer"
          src={(posting as any).company?.logo_url || "/no-image.svg"}
          onClick={handleCompanyClick}
        />
        <div className="flex flex-col md:flex-row justify-between items-center h-full w-full pb-4 md:pb-0 mx-0 md:mx-4">
          <div className="flex flex-col h-full mx-2 justify-center items-center md:items-start">
            <h1
              className="font-extrabold text-xl mt-2 text-primary cursor-pointer"
              onClick={handleCompanyClick}
            >
              {(posting as any).company?.name}
            </h1>
            <h5 className="text-muted-foreground text-base">{posting.title}</h5>
          </div>
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
  );
}

export default CompanyInfoBanner;
