import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Spinner from "@/components/Spinner";

function PublicLayout() {
  return (
    <>
      <Header />
      <Suspense fallback={<Spinner />}>
        <div className="flex flex-col justify-center items-center my-4 mx-8 min-h-[calc(100vh-80px-2rem)]">
          <Outlet />
        </div>
      </Suspense>
    </>
  );
}

export default PublicLayout;
