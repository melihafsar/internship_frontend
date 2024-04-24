import { lazy } from "react";
import ProtectedRoute from "./ProtectedRoute";
import Page from "@/layouts/Page";
import { Mail } from "lucide-react";

const Profile = lazy(() => import("@/pages/Profile"));
const HomePage = lazy(() => import("@/pages/HomePage"));
const Applications = lazy(() => import("@/pages/Applications"));
const Messages = lazy(() => import("@/pages/Messages"));

const messagesTitle = (
  <div className="flex items-center space-x-2">
    <Mail />
    <span>Mesajlarım</span>
  </div>
);

export const mainRoutes = [
  {
    path: "/",
    id: "homepage",
    element: (
      <Page
        title="Anasayfa"
        className="overflow-hidden h-[calc(100vh-80px-4rem)]"
      >
        <HomePage />
      </Page>
    ),
    meta: {
      title: "Anasayfa",
    },
  },
  {
    path: "/applications",
    id: "applications",
    element: <ProtectedRoute title="Başvurularım" component={Applications} />,
    meta: {
      title: "Başvurularım",
    },
  },
  {
    path: "/messages",
    id: "messages",
    element: <ProtectedRoute title="Mesajlarım" component={Messages} />,
    meta: {
      title: messagesTitle,
    },
  },
  {
    path: "/profile",
    id: "profile",
    element: <ProtectedRoute title="Profilim" component={Profile} />,
    meta: {
      title: "Profilim",
    },
  },
];