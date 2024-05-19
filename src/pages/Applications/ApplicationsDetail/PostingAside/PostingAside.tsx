import { useState } from "react";
import PostingComponents from "./PostingComponents";
import { Separator } from "@/components/ui/separator";
interface PostingAsideProps {
  postingId: number | undefined;
  userType: number | null;
  averagePoints: number;
  numberOfComments: number;
}

function PostingAside({
  postingId,
  userType,
  averagePoints,
  numberOfComments,
}: PostingAsideProps) {
  return (
    <div className="flex flex-col justify-center align-center border-4 border-secondary rounded-md">
      <div className="flex flex-col justify-between align-center p-4 h-full">
        <h1 className="text-center text-2xl font-semibold text-primary my-3">
          Stajını Değerlendir
        </h1>
        <Separator />
        <h2 className="text-center text-lg font-semibold text-primary my-2">
          Stajyer Puanı
        </h2>
        <p className="text-center text-[80px] font-semibold text-primary">
          {averagePoints ? averagePoints.toFixed(1) : 0}
        </p>
        <p className="text-center text-lg font-semibold text-primary">
          <span>{numberOfComments}</span> kişi değerlendirdi.
        </p>
      </div>
      <PostingComponents userType={userType} postingId={postingId} />
    </div>
  );
}

export default PostingAside;
