import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  HashRouter,
} from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import PublicLayout from "@/layouts/PublicLayout";
import { mainRoutes } from "./routes/main.routes";
import { publicRoutes } from "./routes/public.routes";
import { Suspense } from "react";
import Spinner from "@/components/Spinner";

export function Router() {
  return createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: mainRoutes.map((route) => ({
        path: route.path,
        element: route.element,
      })),
    },
    {
      path: "/",
      element: <PublicLayout />,
      children: publicRoutes.map((route) => ({
        path: route.path,
        element: route.element,
      })),
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ], {});
}

export const RouterProviderWrapper = () => (
  <Suspense fallback={<Spinner />}>
    <RouterProvider router={Router()} />
  </Suspense>
);
export default RouterProviderWrapper;
