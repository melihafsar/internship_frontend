import React, { createContext, useMemo, useState } from "react";

interface UtilContextProps {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UtilContext = createContext<UtilContextProps>({
  loading: false,
  setLoading: () => {},
});

export const UtilProvider = ({ children }: any) => {
  const [loading, setLoading] = useState<boolean>(false);

  const value = useMemo(() => ({ loading, setLoading }), [loading]);

  return <UtilContext.Provider value={value}>{children}</UtilContext.Provider>;
};

export const useUtil = () => {
  const context = React.useContext(UtilContext);
  if (!context) {
    throw new Error("useUtil must be used within an UtilProvider");
  }
  return context;
};
