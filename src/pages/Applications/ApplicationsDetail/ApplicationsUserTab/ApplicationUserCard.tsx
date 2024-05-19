import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ApplicationUserDetail } from "@/types";

interface ApplicationUserCardProps {
  applicationDetail: ApplicationUserDetail;
}

function ApplicationUserCard({ applicationDetail }: ApplicationUserCardProps) {
  return (
    <div className="flex flex-col w-full justify-between p-4 border border-gray-300 rounded-md">
      <div className="flex flex-col w-full">
        <div className="flex items-center justify-between w-full">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => {
              window.open(
                `/applicant-detail/${applicationDetail.id}`,
                "_blank"
              );
            }}
          >
            <img
              className="w-12 h-12 rounded-full"
              src={applicationDetail.profile_photo_url || "/no-user.svg"}
              alt="user"
            />
            <div className="flex flex-col ml-2">
              <span className="text-sm font-semibold">
                {applicationDetail.name === null ||
                applicationDetail.surname === null
                  ? "Anonim"
                  : `${applicationDetail.name} ${applicationDetail.surname}`}
              </span>
              <span className="text-xs text-gray-400">
                {new Date(applicationDetail.created_at).toLocaleDateString(
                  "tr-TR"
                )}
              </span>
            </div>
          </div>
          <span className="text-xs text-gray-400">
            <Badge variant="default" className="ml-2 text-[10px] px-1.5 py-0.1">
              {new Date(applicationDetail.created_at).toLocaleDateString(
                "tr-TR"
              )}
            </Badge>
          </span>
        </div>
        <div className="w-full mt-2">
          <span>{applicationDetail.message}</span>
        </div>
      </div>
      <Button
        variant="default"
        className="mt-2 bottom-0"
        size="xs"
        onClick={() => {
          window.open(applicationDetail.cv_url, "_blank");
        }}
      >
        Özgeçmişi Göster
      </Button>
    </div>
  );
}

export default ApplicationUserCard;
