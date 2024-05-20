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
const ApplicationsDetailPage = lazy(
  () => import("@/pages/Applications/ApplicationsDetail")
);
const CompanyDetail = lazy(() => import("@/pages/CompanyPortfolio"));
const ApplicantPortfolio = lazy(() => import("@/pages/ApplicantPortfolio"));
const Login = lazy(() => import("@/pages/Login"));

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
        className="overflow-hidden p-0 m-0"
        showTitle={false}
      >
        <HomePage />
      </Page>
    ),
    meta: {
      title: "Anasayfa",
    },
    showNavBar: true,
  },
  {
    path: "/login",
    id: "login",
    element: <Page
      title="Giriş Yap"
      className="overflow-hidden p-0 m-0 h-screen flex items-center login justify-center"
      showTitle={false}>
      <Login />
    </Page>,
    meta: {
      title: "Giriş Yap",
    },
    showNavBar: true,
    userType: -1,
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
    path: "/applications/:id",
    id: "applications-detail",
    element: (
      <ProtectedRoute
        title="İlan Detayları"
        component={ApplicationsDetailPage}
        showTitle={false}
        className="overflow-hidden p-0 m-0"
      />
    ),
    meta: {
      title: "İlan Detayları",
    },
    showNavBar: false,
  },
  {
    path: "/company-detail/:id",
    id: "company-detail",
    element: (
      <Page
        title="Şirket Detayları"
        showTitle={false}
        className=""
      // className="overflow-hidden p-0 m-0"
      // showTitle={false}
      >
        <CompanyDetail />
      </Page>
    ),
    meta: {
      title: "Şirket Detayları",
    },
    showNavBar: false,
  },
  {
    path: "/applicant-detail/:id",
    id: "applicant-detail",
    element: (
      <ProtectedRoute
        userType={1}
        title="Başvuran Detayları"
        component={ApplicantPortfolio}
      />
    ),
    meta: {
      title: "Başvuran Detayları",
    },
    showNavBar: false,
    userType: 1,
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
