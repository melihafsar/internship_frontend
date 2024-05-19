//@ts-nocheck
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InternshipPostingFormTypes } from "@/schemas/internship-posting.schema";

import { Briefcase, Link, Wallet } from "lucide-react";
import { workTypesArray } from "@/const";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

interface PostingCardProps {
  posting: InternshipPostingFormTypes;
  children?: React.ReactNode;
}

function PostingCard({ posting, children }: PostingCardProps) {
  const navigate = useNavigate();
  return (
    <Card className="flex-1 min-w-[270px] max-w-[90%] md:max-w-[300px] p-5 select-none p-0 hover:shadow-lg transition-transform duration-300 transform hover:scale-105">
      <CardHeader className="p-0">
        <img
          className="mb-3 object-cover w-full h-64 rounded-t-lg"
          src={posting.image_url}
          alt={posting.title}
          width={64}
          height={64}
        />
        <CardTitle className="px-3 text-lg truncate">{posting.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col justify-between gap-y-1 py-0 px-3 my-1">
        <div className="flex flex-col gap-1 h-[90px] justify-between">
          <p className="text-sm text-gray-500 line-clamp-3">
            {posting.description}
          </p>
          <div className="flex flex-row justify-between items-center w-full gap-2">
            <p className="flex gap-1 text-sm text-gray-400">
              <Wallet />
              {posting.has_salary ? "Maaşlı" : "Maaşsız"}
            </p>
            <p className="flex gap-1 text-sm text-gray-400">
              <Briefcase />
              {
                workTypesArray.find((item) => item.value === posting.work_type)
                  ?.label
              }
            </p>
          </div>
        </div>
        <div className="">
          <Button
            variant={"link"}
            className="py-0"
            onClick={() => navigate(`/applications/${posting.id}`)}
          >
            <Link className="mr-1" size={14} />
            Daha Fazla Bilgi
          </Button>
        </div>
        <div className="flex gap-2 my-2">
          <img
            className="w-8 h-8 rounded-full border-4 border-primary-500"
            src={posting?.company?.logo_url}
            alt={posting?.company?.name}
          />
          <div className="w-[238px] truncate">
            <p className="text-sm font-semibold line-clamp-1 truncate text-primary-500">
              {posting?.company?.name}
            </p>
            <p className="flex items-center gap-2 text-sm text-gray-400">
              <Progress
                value={posting.company?.average_points}
                className="flex-1 h-1"
              />
              <Badge className="rounded-full text-xs">
                {`${
                  posting.company?.average_points
                    ? posting.company?.average_points.toFixed(1)
                    : "0.0"
                }`}
              </Badge>
            </p>
          </div>
        </div>
      </CardContent>
      {children && <div className="p-2">{children}</div>}
    </Card>
  );
}

export default PostingCard;
