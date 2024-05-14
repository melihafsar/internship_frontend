import { lazy } from "react";
import ProtectedRoute from "./ProtectedRoute";
import { Mail } from "lucide-react";
import Page from "@/layouts/Page";

const Profile = lazy(() => import("@/pages/Profile"));
const HomePage = lazy(() => import("@/pages/HomePage"));
const Applications = lazy(() => import("@/pages/Applications"));
const Messages = lazy(() => import("@/pages/Messages"));
const UserRegister = lazy(() => import("@/pages/UserRegister"));
const MyCompany = lazy(() => import("@/pages/MyCompany"));

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
      <Page className="overflow-hidden p-0 m-0">
        <HomePage />
      </Page>
    ),
    meta: {
      title: "Anasayfa",
    },
    showNavBar: true,
  },
  {
    path: "/applications",
    id: "applications",
    element: (
      <ProtectedRoute
        userType={0}
        title="Başvurularım"
        component={Applications}
      />
    ),
    meta: {
      title: "Başvurularım",
    },
    showNavBar: true,
    userType: 0,
  },
  {
    path: "/messages",
    id: "messages",
    element: (
      <ProtectedRoute userType={0} title="Mesajlarım" component={Messages} />
    ),
    meta: {
      title: messagesTitle,
    },
    showNavBar: true,
    userType: 0,
  },
  {
    path: "/profile",
    id: "profile",
    element: (
      <ProtectedRoute userType={0} title="Profilim" component={Profile} />
    ),
    meta: {
      title: "Profilim",
    },
    showNavBar: true,
    userType: 0,
  },
  {
    path: "/user-registered",
    element: (
      <ProtectedRoute
        title=""
        component={(args) => <UserRegister {...args} />}
      />
    ),
    meta: {
      title: "Kullanıcı Kayıt",
    },
    showNavBar: false,
  },
  {
    path: "/my-company#company-posts",
    element: (
      <ProtectedRoute
        userType={1}
        title="Staj İlanı Oluştur"
        component={MyCompany}
      />
    ),
    meta: {
      title: "İlan Oluştur",
    },
    showNavBar: true,
    userType: 1,
  },
  {
    path: "/my-company",
    element: (
      <ProtectedRoute userType={1} title="Şirketim" component={MyCompany} />
    ),
    meta: {
      title: "Şirketim",
    },
    showNavBar: true,
    userType: 1,
  },
];
