import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { InternNotificationMessage } from "@/types";
import moment from "moment";

interface MessageCardProps {
  message: InternNotificationMessage;
}

function MessageCard({ message }: MessageCardProps) {
  return (
    <Card className="flex-1 p-4 md:hover:bg-foreground/10">
      <CardTitle className="text-lg truncate">{message.title}</CardTitle>
      <CardDescription className="py-2 text-sm text-gray-600">
        {moment(message.created_at).format("YYYY-MM-DD hh:mm")}
      </CardDescription>
      <CardContent
        className="text-sm text-gray-300 p-0"
        style={{ whiteSpace: "pre-wrap" }}
      >
        {message.body}
      </CardContent>
    </Card>
  );
}

export default MessageCard;
