import { createContext, useContext, useMemo, useState } from "react";

interface IsReadonlyContextProps {
    isReadonly: boolean;
}

export const IsReadonlyContext = createContext<IsReadonlyContextProps>({
    isReadonly: false,
});

export const IsReadonlyProvider = ({ children, isReadonly }: { children: any, isReadonly: boolean }) => {

    const value = useMemo<IsReadonlyContextProps>(() => ({ isReadonly }), [isReadonly]);

    return <IsReadonlyContext.Provider value={value}>{children}</IsReadonlyContext.Provider>;
};

export const useIsReadonly = () => {
    const context = useContext(IsReadonlyContext);
    if (!context) {
        // if there is no provider in context we assume its not readonly
        return false;
    }
    return context.isReadonly;
};
