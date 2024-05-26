import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import NavigationMenu from "./Header/NavigationMenu";
import Spinner from "@/components/Spinner";
import { RotateCw } from "lucide-react";
import PullToRefresh from "react-simple-pull-to-refresh";

function MainLayout() {
  const onRefreshChanged = async () => {
    window.location.reload();
  };

  return (
    <Suspense fallback={<Spinner />}>
      <Header children={<NavigationMenu />} />
      <div className="flex flex-col [&_.login]:min-h-[calc(100vh-80px-2rem)]">
        <PullToRefresh
          onRefresh={onRefreshChanged}
          refreshingContent={
            <div className="flex justify-center items-center w-full h-16">
              <RotateCw className="w-8 h-8 animate-spin text-primary" />
            </div>
          }
          backgroundColor="bg-primary"
          pullingContent={<></>}
        >
          <Outlet />
        </PullToRefresh>
      </div>
    </Suspense>
  );
}

export default MainLayout;
