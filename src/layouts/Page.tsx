import React from "react";
import { Helmet } from "react-helmet";
import { cn } from "@/lib/utils";

export default function Page({
  title,
  children,
  className,
  showTitle = true,
}: {
  title: string;
  children: React.ReactNode;
  className: string;
  showTitle?: boolean;
}) {
  const defaultStyle = "flex flex-col flex-1 p-4";
  return (
    <div className={cn(defaultStyle, className)}>
      <Helmet>
        <title>{`${title} | Marmara`}</title>
        <meta name="description" content="Marmara - Staj Platformu" />
      </Helmet>
      {showTitle && <h1 className="text-[1.4rem] font-bold mb-2">{title}</h1>}
      {children}
    </div>
  );
}
