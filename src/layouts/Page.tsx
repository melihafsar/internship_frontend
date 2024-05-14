import React from "react";
import { Helmet } from "react-helmet";
import { cn } from "@/lib/utils";

export default function Page({
  title,
  children,
  className,
}: {
  title?: string;
  children: React.ReactNode;
  className: string;
}) {
  const defaultStyle = "flex flex-col flex-1 p-4";
  return (
    <div className={cn(defaultStyle, className)}>
      <Helmet>
        <title>{`${title} | Marmara`}</title>
        <meta name="description" content="Marmara - Staj Platformu" />
      </Helmet>
      {title && <h1 className="text-[1.4rem] font-bold mb-2">{title}</h1>}
      {children}
    </div>
  );
}
