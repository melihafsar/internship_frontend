import { useToast } from "@/components/ui/use-toast";
import { ApplicationUserDetail } from "@/types";
import { useEffect, useState } from "react";
import CompanyService from "@/services/company.service";
import ApplicationUserCard from "./ApplicationUserCard";
import { Skeleton } from "@/components/ui/skeleton";

interface ApplicationsUserTabProps {
  postingId: number;
}

function ApplicationsUserTab({ postingId }: ApplicationsUserTabProps) {
  const [loading, setLoading] = useState(false);
  const [applicationsList, setApplicationsList] = useState<
    ApplicationUserDetail[]
  >([]);
  const { toast } = useToast();

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const response = await CompanyService.getApplicationsList(postingId);
      setApplicationsList(response.data);
      console.log(response.data);
    } catch (error) {
      toast({
        title: "Hata",
        description: "Başvurular getirilirken bir hata oluştu.",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full border-4 border-secondary rounded-md p-2">
      {loading ? (
        Array.from({ length: 4 }).map((_, index) => (
          <div
            className="flex flex-col items-center space-4 m-1 gap-5 border border-gray-300 rounded-md p-4 min-h-[160px]"
            key={index}
          >
            <div className="flex flex-row justiy-center items-center w-full">
              <Skeleton className="h-12 w-12 rounded-full" />
              <Skeleton className="h-4 w-2/3 ml-2" />
            </div>
            <div className="space-y-2 w-full">
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          </div>
        ))
      ) : applicationsList.length === 0 ? (
        <div className="flex items-center justify-center w-full text-center my-4">
          <span>Bu staj için daha önce başvuru yapılmamıştır.</span>
        </div>
      ) : (
        applicationsList.map((applicationDetail, index) => (
          <ApplicationUserCard
            key={index}
            applicationDetail={applicationDetail}
          />
        ))
      )}
    </div>
  );
}

export default ApplicationsUserTab;
