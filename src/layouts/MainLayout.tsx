import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import NavigationMenu from "./Header/NavigationMenu";
import Spinner from "@/components/Spinner";

function MainLayout() {
  return (
    <Suspense fallback={<Spinner />}>
      <Header children={<NavigationMenu />} />
      <div className="flex flex-col [&_.login]:min-h-[calc(100vh-80px-2rem)]">
        <Outlet />
      </div>
    </Suspense>
  );
}

export default MainLayout;
