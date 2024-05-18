import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useUtil } from "@/context/UtilContext";
import ProfileService from "@/services/profile.service";
import moment from "moment";
import { useEffect, useState } from "react";

function Messages() {
  const { setLoading } = useUtil();
  const [messages, setMessages] = useState<{ title: string, body: string, created_at: string }[]>([]);
  const { toast } = useToast();

  const init = async () => {
    setLoading(true);
    try {
      const messages = await ProfileService.getMessages();
      setMessages(messages.data);
    }
    catch (e) {
      console.log(e);
      toast({
        variant: "destructive",
        content: "Veriler getirilirken bir hata oluştu.",
      });
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    init();
  }, []);


  return <>
    <div className="space-y-4 ">
      {messages.map((message, index) => {
        return <Card key={index} className="p-4 w-max">
          <CardTitle>{message.title}</CardTitle>
          <CardDescription className="py-2">{moment(message.created_at).format("YYYY-MM-DD hh:mm")}</CardDescription>
          <CardContent>{message.body}</CardContent>
        </Card>;
      })}
    </div>
  </>;
}

Messages.propTypes = {};

export default Messages;
