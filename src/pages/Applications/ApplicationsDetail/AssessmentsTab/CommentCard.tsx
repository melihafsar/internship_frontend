import { Badge } from "@/components/ui/badge";
import { Comment } from "@/types";

interface CommentCardProps {
  comment: Comment;
}

function CommentCard({ comment }: CommentCardProps) {
  return (
    <div className="flex flex-col w-full items-center justify-center p-4">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          <img
            className="w-12 h-12 rounded-full"
            src={comment.photo_url || "/no-user.svg"}
            alt="user"
          />
          <div className="flex flex-col ml-2">
            <span className="text-sm font-semibold">
              {comment.user_name === null || comment.user_surname === null
                ? "Anonim"
                : `${comment.user_name} ${comment.user_surname}`}
            </span>
            <span className="text-xs text-gray-400">
              {new Date(comment.created_at).toLocaleDateString("tr-TR")}
            </span>
          </div>
        </div>
        <span className="text-xs text-gray-400">
          <Badge variant="default" className="ml-2 text-[10px] px-1.5 py-0.1">
            {comment.points}
          </Badge>
        </span>
      </div>
      <div className="w-full mt-2">
        <span>{comment.comment}</span>
      </div>
    </div>
  );
}

export default CommentCard;
