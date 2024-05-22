import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import InternshipService from "@/services/internship.service";
import { MyApplicationType, ServiceResponse } from "@/types";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import ApplicationCard from "./ApplicationsDetail/ApplicationCard";
import { Card } from "@/components/ui/card";

function Applications() {
  const [internApplicationsData, setInternApplicationsData] = useState<
    MyApplicationType[]
  >([]);
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const fetchInternApplications = async () => {
    setLoading(true);
    try {
      const response = await InternshipService.listInternApplications();
      setInternApplicationsData(response.data);
    } catch (error) {
      const axiosError = error as AxiosError<ServiceResponse>;
      toast({
        title: "Error",
        description: `${axiosError.response?.data.error.details} Bir hata oluştu.`,
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchInternApplications();
  }, []);

  return (
    <div className="w-full md:w-[90%] h-full">
      <div className="flex justify-center md:justify-start items-center gap-4 flex-wrap my-2 h-full w-full">
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <Card
              className="flex flex-col flex-1 min-w-[270px] max-w-[90%] md:max-w-[300px] p-5 select-none p-0 hover:shadow-lg transition-transform duration-300 transform hover:scale-105 h-[508px] items-center gap-2 border justify-center"
              key={index}
            >
              <Skeleton className="h-4/5 w-full" />
              <div className="space-y-2 w-full pb-2 pl-2">
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-4/5" />
              </div>
              <Skeleton className="h-6 w-[95%] my-2" />
            </Card>
          ))
        ) : internApplicationsData.length === 0 ? (
          <div className="text-gray-500">
            Henüz başvurduğunuz bir ilan bulunmamaktadır.
          </div>
        ) : (
          internApplicationsData.map((application, index) => (
            <ApplicationCard
              key={`${application.posting.id}-${index}`}
              data={application}
            />
          ))
        )}
      </div>
    </div>
  );
}
export default Applications;
