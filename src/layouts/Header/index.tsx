import React from "react";
import { ModeToggle } from "../../components/mode-toggle";
import { Separator } from "@/components/ui/separator";

interface HeaderProps {
  children?: React.ReactNode;
}

function Header({ children }: HeaderProps) {
  return (
    <>
      <div className="flex flex-row w-full h-20 justify-between px-4 items-center">
        <div className="text-xl font-semibold italic">STAJBULDUM.NET</div>
        <div className="flex space-x-2">
          {children}
          <ModeToggle />
        </div>
      </div>
      <Separator />
    </>
  );
}

export default Header;
