import { UserDetail } from "@/types";
import React, { createContext, useMemo, useState } from "react";

interface UserContextProps {
  userDetailData: UserDetail;
  setUserDetailData: React.Dispatch<React.SetStateAction<UserDetail>>;
}

export const UserContext = createContext<UserContextProps>({
  userDetailData: {} as UserDetail,
  setUserDetailData: () => {},
});

export const UserProvider = ({ children }: any) => {
  const [userDetailData, setUserDetailData] = useState<UserDetail>(
    {} as UserDetail
  );

  const value = useMemo(
    () => ({ userDetailData, setUserDetailData }),
    [userDetailData]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within an UserProvider");
  }
  return context;
};
