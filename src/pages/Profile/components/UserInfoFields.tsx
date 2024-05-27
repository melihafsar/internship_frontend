import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { userInfoFields } from "./index";
import { UserDetail } from "@/types";
import { useIsReadonly } from "@/context/IsReadonlyContext";

interface UserInfoFieldsProps {
  user: UserDetail;
}

function UserInfoFields({ user }: UserInfoFieldsProps) {
  const isReadonly = useIsReadonly();

  return (
    <>
      {userInfoFields.map((field) => (
        <div id={field.id} key={field.id} className="mb-8">
          <Card className="border-2 hover:ease-in hover:duration-500 hover:border-orange-500 ">
            <CardHeader className="bg-primary-foreground rounded-t-md mb-4">
              <CardTitle className="text-lg">{field.title}</CardTitle>
              <CardDescription>{field.description(isReadonly)}</CardDescription>
            </CardHeader>
            <CardContent>{field.component(user)}</CardContent>
          </Card>
        </div>
      ))}
    </>
  );
}

export default UserInfoFields;
