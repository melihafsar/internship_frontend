import { lazy } from "react";

const NotFound = lazy(() => import("@/pages/NotFound"));
const Login = lazy(() => import("@/pages/Login"));

export const publicRoutes = [
  {
    path: "/login",
    id: "login",
    element: <Login />,
    meta: {
      title: "Giriş Yap",
    },
  },
  {
    path: "/404",
    id: "notfound",
    element: <NotFound />,
    meta: {
      title: "Sayfa Bulunamadı",
    },
  },
];
