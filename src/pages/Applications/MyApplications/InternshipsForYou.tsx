import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import InternshipService from "@/services/internship.service";
import { MyApplicationType, ServiceResponse } from "@/types";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import PostingCard from "@/components/PostingCard";
import { Info, InfoIcon } from "lucide-react";

function InternshipsForYou() {
  const [recommendedPosting, setRecommendedPosting] = useState<
    MyApplicationType[]
  >([]);
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const fetchRecommendedPosting = async () => {
    setLoading(true);
    try {
      const response = await InternshipService.listRecommendedPosting();
      setRecommendedPosting(response.data);
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
    fetchRecommendedPosting();
  }, []);

  return (
    <div className="flex flex-col max-h-[680px] w-[90%] md:w-[320px]">
      <h1 className="text-xl font-semibold mt-2 ml-[18px]">
        Senin İçin Önerilenler
      </h1>
      <div className="flex flex-col w-full h-full gap-4 overflow-y-auto p-4 pt-2 mt-4">
        {loading ? (
          Array.from({ length: 1 }).map((_, index) => (
            <Card
              className="flex flex-col w-[90%] md:w-[300px] p-5 select-none p-0 hover:shadow-lg transition-transform duration-300 transform items-center gap-2 border justify-center h-[508px]"
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
        ) : recommendedPosting?.length === 0 ? (
          <div className="text-gray-500">
            Henüz önerilen bir ilan bulunmamaktadır.
          </div>
        ) : (
          recommendedPosting.map((application, index) => (
            <PostingCard
              posting={application}
              key={`${application.id}-${index}`}
            />
          ))
        )}
      </div>
      <div className="flex gap-2 m-4">
        <Info className="w-8 h-8 text-gray-500" />
        <p className="text-sm text-gray-500">
          Buradaki ilanlar, ilgi alanlarınıza göre önerilmektedir.
        </p>
      </div>
    </div>
  );
}

export default InternshipsForYou;
