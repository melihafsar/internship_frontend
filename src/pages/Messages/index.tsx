import { useToast } from "@/components/ui/use-toast";
import ProfileService from "@/services/profile.service";
import { InternNotificationMessage } from "@/types";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import MessageCard from "./MessageCard";

function Messages() {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<InternNotificationMessage[]>([]);
  const { toast } = useToast();

  const init = async () => {
    setLoading(true);
    try {
      const messages = await ProfileService.getMessages();
      setMessages(messages.data);
    } catch (e) {
      toast({
        variant: "destructive",
        content: "Mesajlarınız getirilirken bir hata oluştu.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {loading ? (
        Array.from({ length: 10 }).map((_, index) => (
          <div className="flex items-center space-x-4" key={index}>
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ))
      ) : messages.length === 0 ? (
        <div className="text-gray-500">Henüz mesajınız bulunmamaktadır.</div>
      ) : (
        messages.map((message, index) => {
          return <MessageCard key={index} message={message} />;
        })
      )}
    </div>
  );
}

export default Messages;
