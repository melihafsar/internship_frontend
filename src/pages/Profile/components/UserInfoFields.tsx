import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { userInfoFields } from "./index";
import React from "react";
import { UserDetail } from "@/types";

interface UserInfoFieldsProps {
  user: UserDetail;
  setUser: React.Dispatch<React.SetStateAction<UserDetail>>;
}

function UserInfoFields({ user, setUser }: UserInfoFieldsProps) {
  return (
    <>
      {userInfoFields.map((field) => (
        <div id={field.id} key={field.id} className="mb-8">
          <Card className="border-2 hover:ease-in hover:duration-500 hover:border-orange-500 ">
            <CardHeader className="bg-primary-foreground rounded-t-md mb-4">
              <CardTitle className="text-lg">{field.title}</CardTitle>
              <CardDescription>{field.description}</CardDescription>
            </CardHeader>
            <CardContent>
              {React.cloneElement(field.component, {
                user: user,
                setUser: setUser,
              })}
            </CardContent>
          </Card>
        </div>
      ))}
    </>
  );
}

export default UserInfoFields;
