import { Comment } from "@/types";
import CommentCard from "./CommentCard";
interface AssessmentsTabsProps {
  comments: Comment[];
}

function AssessmentsTabs({ comments }: AssessmentsTabsProps) {
  return (
    <div className="flex flex-col w-full h-full border-4 border-secondary rounded-md">
      {comments.length === 0 && (
        <div className="flex items-center justify-center w-full text-center my-4">
          <span>Bu staj için daha önce yorum yapılmamıştır.</span>
        </div>
      )}
      {comments.map((comment, index) => (
        <CommentCard key={index} comment={comment} />
      ))}
    </div>
  );
}

export default AssessmentsTabs;
