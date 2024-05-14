import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

function MostPreferredPost() {
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
      className="w-[90%]"
    >
      <CarouselContent>
        {Array.from({ length: 10 }).map((_, index) => (
          <CarouselItem
            key={index}
            className="md:basis-1/2 lg:basis-1/4 xl:basis-1/5 2xl:basis-1/6"
          >
            <Card className="bg-secondary text-white">
              <CardContent className="flex aspect-square items-center justify-center p-6 ">
                <span
                  className="text-3xl font-bold text-primary
                "
                >
                  {index + 1}
                </span>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export default MostPreferredPost;
