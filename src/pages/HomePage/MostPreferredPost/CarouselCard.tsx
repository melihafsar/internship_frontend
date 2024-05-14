import { Card, CardContent } from "@/components/ui/card";
import { InternshipPostingFormTypes } from "@/schemas/internship-posting.schema";
import { Briefcase, Wallet } from "lucide-react";

interface CarouselCardProps {
  posting: InternshipPostingFormTypes;
}

function CarouselCard({ posting }: CarouselCardProps) {
  return (
    <Card className="bg-secondary text-white rounded-lg overflow-hidden">
      <CardContent className="flex aspect-square items-center justify-center p-0 group relative">
        <div className="relative w-full h-full">
          <img
            src={posting.image_url}
            alt={posting.title}
            className="object-contain w-full h-full rounded-lg"
          />
          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center h-24 group-hover:h-40 p-2 w-full  bg-opacity-60 transform translate-y-1/2 group-hover:translate-y-0 transition-all duration-500 bg-gradient-to-t from-secondary to-transparent">
            <div className="opacity-100 group-hover:opacity-100">
              <h2 className="text-center mt-2 text-sm font-bold truncate">
                {posting.title}
              </h2>
              <div className="flex flex-row justify-evenly text-xs font-semibold gap-2 items-center">
                <p className="flex gap-1 text-sm text-gray-200">
                  <Briefcase /> {posting?.employment_type}
                </p>
                <p className="flex gap-1 text-sm text-gray-200">
                  <Wallet />
                  {posting.has_salary ? "Maaşlı" : "Maaşsız"}
                </p>
              </div>
              <p className="text-xs line-clamp-5 pt-6">{posting.description}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default CarouselCard;
