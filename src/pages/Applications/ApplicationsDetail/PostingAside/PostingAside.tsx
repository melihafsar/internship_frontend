import { useState } from "react";
import PostingComponents from "./PostingComponents";
interface PostingAsideProps {
  postingId: number | undefined;
  userType: number | null;
}

function PostingAside({ postingId, userType }: PostingAsideProps) {
  const [loading, setLoading] = useState(false);
  return (
    <div className="flex flex-col justify-center align-center min-h-[500px] border-4 border-secondary rounded-md">
      <PostingComponents
        userType={userType}
        postingId={postingId}
        loading={loading}
      />
    </div>
  );
}

export default PostingAside;

// "number_of_comments": 0,
// "average_points": 0
