import { navigationItems } from "./index";
import { cn } from "@/lib/utils";

interface CompanyNavigationItemsProps {
  activeTab: string;
}

function CompanyNavigationItems({ activeTab }: CompanyNavigationItemsProps) {
  return (
    <>
      {navigationItems.map((item) => (
        <a
          href={item.href}
          key={item.id}
          className={cn(
            "flex items-center p-1 rounded-md hover:ease-in hover:duration-300 hover:border-orange-500 border-2 border-transparent",
            { "bg-muted": activeTab === item.id }
          )}
        >
          <span className="text-muted-foreground m-1">{item.icon}</span>
          <div className="inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 justify-start">
            {item.label}
          </div>
        </a>
      ))}
    </>
  );
}

export default CompanyNavigationItems;
