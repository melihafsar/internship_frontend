import PostingCard from "@/components/PostingCard";
import { Button } from "@/components/ui/button";
import { MyApplicationType } from "@/types";
import { mobileCheck } from "@/utils/helpers.utils";

interface ApplicationCardProps {
  data: MyApplicationType;
}

function ApplicationCard({ data }: ApplicationCardProps) {
  return (
    <>
      {data && (
        <PostingCard posting={data?.posting as any}>
          <Button
            variant="secondary"
            className="bottom-0 w-full"
            size="xs"
            onClick={() => {
              window.open(data?.cv_url, mobileCheck() ? "_self" : "_blank");
            }}
          >
            Özgeçmişi Göster
          </Button>
        </PostingCard>
      )}
    </>
  );
}

export default ApplicationCard;
