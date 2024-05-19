import {
  BookOpenText,
  FlaskConical,
  FolderKey,
  Languages,
  Presentation,
  User,
  Waypoints,
} from "lucide-react";

import ContactDetails from "./ContactDetails";
import PrivateInformation from "./PrivateInformation";
import WorkExperience from "./WorkExperience";
import Education from "./Education";
import Projects from "./Projects";
import References from "./References";
import ForeignLanguages from "./ForeignLanguages";
import { UserDetail } from "@/types";
import { is } from "date-fns/locale";

export const navigationItems = [
  {
    id: "contact-nav",
    label: "İletişim Bilgileri",
    href: "#contact",
    icon: <User />,
  },
  {
    id: "experience-nav",
    label: "İş Deneyimleri",
    href: "#experience",
    icon: <FlaskConical />,
  },
  {
    id: "education-nav",
    label: "Eğitim Bilgileri",
    href: "#education",
    icon: <BookOpenText />,
  },
  {
    id: "private-nav",
    label: "Özel Bilgiler",
    href: "#private",
    icon: <FolderKey />,
  },
  // {
  //   id: "skills-nav",
  //   label: "Yetenekler",
  //   href: "#skills",
  //   icon: <LayoutTemplate />,
  // },
  {
    id: "languages-nav",
    label: "Yabancı Diller",
    href: "#languages",
    icon: <Languages />,
  },
  {
    id: "projects-nav",
    label: "Projeler",
    href: "#projects",
    icon: <Presentation />,
  },
  {
    id: "references-nav",
    label: "Referanslar",
    href: "#references",
    icon: <Waypoints />,
  },
];

export const userInfoFields = [
  {
    id: "contact",
    title: "İletişim Bilgileri",
    description: (isReadOnly?: boolean): string => {
      return isReadOnly
        ? ""
        : "İletişim bilgilerinizi doğru bir şekilde doldurmanız sizi diğer kullanıcılarla buluşturmamız da yardımcı olacaktır."
    },
    component: (user: UserDetail) => <ContactDetails user={user} />,
  },
  {
    id: "experience",
    title: "İş Deneyimleri",
    description: (isReadOnly?: boolean) => {
      return isReadOnly
        ? ""
        : "İş deneyimlerinizi paylaşarak daha fazla iş fırsatı yakalayın.";
    },
    component: (user: UserDetail) => <WorkExperience user={user} />,
  },
  {
    id: "education",
    title: "Eğitim Bilgileri",
    description: (isReadOnly?: boolean) => {
      return isReadOnly
        ? ""
        : "Eğitim bilgilerinizi paylaşmanız sizi diğer adaylardan öne çıkarır.";
    },
    component: (user: UserDetail) => <Education user={user} />,
  },
  {
    id: "private",
    title: "Özel Bilgiler",
    description: (isReadOnly?: boolean) => {
      return isReadOnly
        ? ""
        : "Firmaların sizi daha iyi tanımasına yardımcı olacak bilgilerinizi doldurarak daha fazla iş fırsatı yakalayın.";
    },
    component: (user: UserDetail) => <PrivateInformation user={user} />,
  },
  // {
  //   id: "skills",
  //   title: "Yetenekler",
  //   description: (isReadOnly?: boolean) => {
  // return isReadOnly
  //   ? ""
  //    : //     "Yeteneklerinizden bahsederek daha farklı alanlarda iş fırsatları yakalayabilirsiniz.";
  //},
  //   component: (user : UserDetail) =>  <Skills user={user}/>,
  // },
  {
    id: "languages",
    title: "Yabancı Diller",
    description: (isReadOnly?: boolean) => {
      return isReadOnly
        ? ""
        : "Öğrendiğiniz yabancı dilleri yazarak yaşadığınız ülkeye göre farklı dillerde iş fırsatları yakalayabilirsiniz.";
    },
    component: (user: UserDetail) => <ForeignLanguages user={user} />,
  },
  {
    id: "projects",
    title: "Projeler",
    description: (isReadOnly?: boolean) => {
      return isReadOnly
        ? ""
        : "Yaptığınız projeleri paylaşarak firmaların sizi daha eşsiz bulmasını sağlayın.";
    },
    component: (user: UserDetail) => <Projects user={user} />,
  },
  {
    id: "references",
    title: "Referanslar",
    description: (isReadOnly?: boolean) => {
      return isReadOnly
        ? ""
        : "Referanslarınız ile firmaların sizi daha iyi tanımasını sağlayın.";
    },
    component: (user: UserDetail) => <References user={user} />,
  },
];
