import React from "react";
import { ModeToggle } from "../../components/mode-toggle";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

interface HeaderProps {
  children?: React.ReactNode;
}

function Header({ children }: HeaderProps) {
  return (
    <>
      <div className="flex flex-row w-full h-20 justify-between px-4 items-center">
        <a href={"/"} className="flex items-center gap-2">
          <img src="/stajbuldum.webp" className="h-8 md:h-14 rounded-full" />
          <div className="text-l md:text-xl font-semibold italic">
            STAJBULDUM.NET
          </div>
        </a>
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
