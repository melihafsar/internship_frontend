import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CarouselCard from "./CarouselCard";
import { InternshipPostingFormTypes } from "@/schemas/internship-posting.schema";
import { useToast } from "@/components/ui/use-toast";
import { PagedListDto } from "@/types";
import { useEffect, useState } from "react";
import CompanyService from "@/services/company.service";
import { Skeleton } from "@/components/ui/skeleton";

function MostPreferredPost() {
  const [postings, setPostings] =
    useState<PagedListDto<InternshipPostingFormTypes>>();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchPostings = async () => {
    setLoading(true);
    try {
      const response = await CompanyService.listPostings(
        0,
        undefined,
        10,
        "Popularity"
      );
      setPostings(response.data);
    } catch {
      toast({
        title: "Hata",
        description: "Şirket staj ilanları getirilirken bir hata oluştu.",
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPostings();
  }, []);

  const plugin = React.useRef(
    Autoplay({
      delay: 5000,
      stopOnInteraction: true,
      reverse: false,
      pauseOnHover: true,
      waitForTransition: true,
      loop: true,
      speed: 1000,
    })
  );

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      className="w-[70%] md:w-[90%] select-none"
    >
      <CarouselContent>
        {loading
          ? Array.from({ length: 10 }).map((_, index) => (
              <CarouselItem
                key={index}
                className="md:basis-1/2 lg:basis-1/4 xl:basis-1/5 2xl:basis-1/6"
              >
                <div className="flex flex-col aspect-square h-full w-full justify-between items-center gap-2">
                  <Skeleton className="h-4/5 w-full" />
                  <div className="space-y-2 w-full">
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-4 w-4/5" />
                  </div>
                </div>
              </CarouselItem>
            ))
          : postings?.items &&
            postings.items.map((posting, index) => (
              <CarouselItem
                key={index}
                className="md:basis-1/2 lg:basis-1/4 xl:basis-1/5 2xl:basis-1/6"
              >
                <CarouselCard posting={posting} />
              </CarouselItem>
            ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export default MostPreferredPost;
